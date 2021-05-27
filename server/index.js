import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import bodyParser from 'body-parser';
import db from './db';
import renderMiddleware from './middleware/renderMiddleware';
import apiMiddleware from './middleware/apiMiddleware';

const testValueUuid = uuidv4();

export const start = async () => {
    const pg = await db();
    await pg('create-tables');
    await pg('dummy-data', [testValueUuid, uuidv4()]);

    const { dashboard, data } = renderMiddleware({ pg });
    const { removeValue, removeValues, addValue, getValues, addActivity, removeActivity, logActivity } = apiMiddleware({ pg, testValueUuid });

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const port = 8000;
    app.set('port', port);
    app.use(express.static('dist'));

    app.get('/', dashboard);
    app.get('/data', data);
    app.get('/values', getValues);
    app.delete('/values/:valueId', removeValue);
    app.delete('/values', removeValues);
    app.delete('/activities/:activityId', removeActivity);
    app.post('/values', addValue);
    app.post('/activities', addActivity);
    app.put('/activities/:activityId', logActivity);

    const server = http.createServer(app);
    server.listen(port);

    return {
        pg,
        server,
        app,
    }
};

export const stop = async (server) => {
    server.close();
};


