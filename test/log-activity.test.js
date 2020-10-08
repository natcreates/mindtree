import {v4 as uuidv4} from "uuid";
const chai = require('chai');
const supertest = require('supertest');
const { expect } = chai;

import { start, stop } from '../server';

describe('Log activity', () => {
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

    it('should increase the score of all associated values', async () => {
        const value_id = uuidv4();
        const value_id2 = uuidv4();
        const activity_id = uuidv4();
        await _pg('add-value', Object.values({ value_id, name: 'Spirituality', description: '' }));
        await _pg('add-value', Object.values({ value_id: value_id2, name: 'Community', description: '' }));
        await _pg('add-activity', Object.values({ activity_id, name: 'Yoga', description: '' }));
        await _pg('add-weighting', Object.values({ activity_id, value_id, weight: 10 }));
        await _pg('add-weighting', Object.values({ activity_id, value_id: value_id2, weight: 5 }));

        const valuesBeforeLogging = await _pg('read-values');
        expect(valuesBeforeLogging.every(({ score }) => score === 0)).to.equal(true);

        await _request
            .put(`/activities/${activity_id}`)
            .expect(204);
        const [community, spirituality] = await _pg('read-values');
        expect(community.score).to.equal(5);
        expect(spirituality.score).to.equal(10);
    });
});
