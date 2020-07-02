import path from 'path';

export default ({pg}) => {
    const dashboard = async (req, res, next) => {
        try {
            const values = await pg('read-values');
            res.status(200).sendFile(path.join(__dirname, '../index.html'));
        } catch (error) {
            next(error);
        }
    };

    const data = async (req, res, next) => {
        try {
            const values = await pg('read-values');
            res.status(200).send(values.rows);
        } catch (error) {
            next(error);
        }
    };

    return {
        dashboard,
        data,
    }
};

