import {v4 as uuidv4} from "uuid";
const chai = require('chai');
const supertest = require('supertest');
const { expect } = chai;

import { start, stop } from '../server';

describe('Create activity', () => {
    let _pg;
    let _server;
    let _request;

    before(async () => {
        const { pg, server, app } = await start();
        _pg = pg;
        _server = server;
        _request = supertest(app);
    });

    afterEach(async () => {
        await _pg('nuke');
        await stop(_server);
    });

    it('should create an activity and weighting', async () => {
        const value_id = uuidv4();
        await _pg('add-value', Object.values({ value_id, name: 'Thing', description: '' }));

        await _request
            .post('/activities')
            .set('Content-Type', 'application/json')
            .send({ name: 'Yoga', description: 'Some morning yoga', valueId: value_id, weight: 10 })
            .expect(204);
        const activities = await _pg('read-activities');
        const weightings = await _pg('read-weightings');
        expect(activities.length).to.equal(1);
        expect(activities[0].name).to.equal('Yoga');
        expect(activities[0].description).to.equal('Some morning yoga');
        expect(weightings.length).to.equal(1);
        expect(weightings[0].activity_id).to.equal(activities[0].activity_id);
        expect(weightings[0].value_id).to.equal(value_id);
        expect(weightings[0].weight).to.equal(10);
    });
});
