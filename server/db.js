import pg from 'pg';
import path from 'path';
import format from 'pg-format';
import fs from 'fs';
import glob from 'glob'
import util from 'util';
import config from './../config';

let pool;
let sql;

const loadSql = async () => {
    const globPromise = util.promisify(glob);
    const location = path.join(__dirname, './sql');
    const sqlFiles = await globPromise(`${location}/**/**.sql`, {});
    console.log('sqlFiles:', sqlFiles)
    const allSql = {};
    sqlFiles.forEach((sqlFile) => {
        allSql[sqlFile.replace(`${location}/`, '').replace(/.sql$/, '')] = fs.readFileSync(sqlFile, {encoding: 'utf-8'});
    });
    return allSql;
};

const run = (queries) => async (queryName, values = []) => {
    pool = new pg.Pool(config.pg);
    const sql = queries[queryName] || queryName;
    const query = [sql, [].concat(values)];
    console.log(`Running ${queryName}`);

    try {
        const result = pool.query(...query);
        await pool.end();
        return result;
    } catch (error) {
        console.log('Problem running query', error);
    }
};

export default async () => {
    try {
        if (!sql) {
            sql = await loadSql();
        }
        return run(sql);
    } catch (error) {
        console.log(error);
    }
};
