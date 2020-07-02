import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import bodyParser from 'body-parser';
import db from './db';
import renderMiddleware from './middleware/renderMiddleware';
import apiMiddleware from './middleware/apiMiddleware';

const testValueUuid = uuidv4();
(async function() {
    const pg = await db();
    await pg('create-tables');
    await pg('dummy-data', [testValueUuid, uuidv4()]);

    const { dashboard, data } = renderMiddleware({ pg });
    const { removeValue, addValue, addActivity, removeActivity } = apiMiddleware({ pg, testValueUuid });

    const app = express();
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    const port = 8000;
    app.set('port', port);

    app.get('/', dashboard);
    app.get('/data', data);
    app.delete('/values/:valueId', removeValue);
    app.delete('/activities/:activityId', removeActivity);
    app.post('/values', addValue);
    app.post('/activities', addActivity);

    const server = http.createServer(app);
    server.listen(port);
})();


