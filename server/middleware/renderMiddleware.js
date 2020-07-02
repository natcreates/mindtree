export default ({pg}) => async (req, res, next) => {
    try {
        const values = await pg('read-values');
        res.status(200).send(values.rows);
    } catch (error) {
        next(error);
    }
};

