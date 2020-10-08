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
        await _pg('nuke');
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

    it('should update an existing activity and weighting', async () => {
        const value_id = uuidv4();
        const value_id2 = uuidv4();
        const activity_id = uuidv4();
        await _pg('add-value', Object.values({ value_id, name: 'Thing', description: '' }));
        await _pg('add-value', Object.values({ value_id: value_id2, name: 'Thing2', description: '' }));
        await _pg('add-activity', Object.values({ activity_id, name: 'Thing', description: 'An activity' }));
        await _pg('add-weighting', Object.values({ activity_id, value_id, weight: 3 }));
        await _pg('add-weighting', Object.values({ activity_id, value_id: value_id2, weight: 4 }));

        await _request
            .post('/activities')
            .set('Content-Type', 'application/json')
            .send({ name: 'Yoga', description: 'Some morning yoga', valueId: value_id, weight: 10, activityId: activity_id })
            .expect(204);
        const activities = await _pg('read-activities');
        const weightings = await _pg('read-weightings');
        expect(activities.length).to.equal(1);
        expect(activities[0].name).to.equal('Yoga');
        expect(activities[0].description).to.equal('Some morning yoga');
        expect(weightings.length).to.equal(2);
        expect(weightings[0].activity_id).to.equal(activities[0].activity_id);
        expect(weightings[0].value_id).to.equal(value_id);
        expect(weightings[0].weight).to.equal(10);
        expect(weightings[1].weight).to.equal(4);
    });
});
