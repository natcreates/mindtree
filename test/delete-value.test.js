import {v4 as uuidv4} from "uuid";
const chai = require('chai');
const supertest = require('supertest');
const { expect } = chai;

import { start, stop } from '../server';

describe('Delete value', () => {
    let _pg;
    let _server;
    let _request;

    before(async () => {
        const { pg, server, app } = await start();
        _pg = pg;
        _server = server;
        _request = supertest(app);
        await _pg('nuke');
    });

    afterEach(async () => {
        await _pg('nuke');
        await stop(_server);
    });

    it('should mark a single value as deleted', async () => {
        const value_id = uuidv4();
        await _pg('add-value', Object.values({ value_id, name: 'Thing', description: '' }));

        await _request
            .delete(`/values/${value_id}`)
            .expect(204);
        const values = await _pg('read-values-including-deleted');
        expect(values.length).to.equal(1);
        expect(values[0].deleted).to.equal(true);
    });

    it('should mark all weightings associated with the value as deleted, but not activities', async () => {
        const value_id = uuidv4();
        const activity_id = uuidv4();
        await _pg('add-value', Object.values({ value_id, name: 'Thing', description: '' }));
        await _pg('add-activity', Object.values({ activity_id, name: 'Thing', description: 'An activity' }));
        await _pg('add-weighting', Object.values({ activity_id, value_id, weight: 3 }));

        await _request
            .delete(`/values/${value_id}`)
            .expect(204);
        const values = await _pg('read-values-including-deleted');
        const activities = await _pg('read-activities-including-deleted');
        const weightings = await _pg('read-weightings-including-deleted');
        expect(values.length).to.equal(1);
        expect(values[0].deleted).to.equal(true);
        expect(activities.length).to.equal(1);
        expect(activities[0].deleted).to.equal(false);
        expect(weightings.length).to.equal(1);
        expect(weightings[0].deleted).to.equal(true);

    });
});
