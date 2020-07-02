import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import bodyParser from 'body-parser';
import db from './db';
import renderMiddleware from './middleware/renderMiddleware';
import apiMiddleware from './middleware/apiMiddleware';

(async function() {
    const pg = await db();
    await pg('create-tables');
    await pg('dummy-data', [uuidv4(), uuidv4()]);

    const render = renderMiddleware({ pg });
    const { removeValue, addValue, addActivity, removeActivity } = apiMiddleware({ pg });

    const app = express();
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    const port = 8000;
    app.set('port', port);

    app.get('/', render);
    app.delete('/values/:valueId', removeValue);
    app.delete('/activities/:activityId', removeActivity);
    app.post('/values', addValue);
    app.post('/activities', addActivity);

    const server = http.createServer(app);
    server.listen(port);
})();


