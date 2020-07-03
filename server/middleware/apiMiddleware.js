import { v4 as uuidv4 } from 'uuid';

export default ({pg, testValueUuid}) => {
    const getValues = async (req, res, next) => {
        try {
            const values = await pg('read-values');
            const activities = await pg('read-activities');
            return res.status(200).send({ values, activities });
        } catch (error) {
            next(error);
        }
    };
    const removeValue = async (req, res, next) => {
        const { valueId } = req.params;
        try {
            await pg('mark-value-as-deleted', [valueId]);
            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
    const removeValues = async (req, res, next) => {
        try {
            await pg('mark-all-values-as-deleted');
            console.log('removing');
            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
    const addValue = async (req, res, next) => {
        const { name, description = '' } = req.body;
        try {
            await pg('add-value', Object.values({ value_id: uuidv4(), name, description }));
            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
    const addActivity = async (req, res, next) => {
        const { name, description = '', weight, activityId = uuidv4(), valueId = testValueUuid } = req.body;
        try {
            await pg('add-activity', Object.values({ activityId, name, description }));
            await pg('add-weighting', Object.values({ activityId, valueId, weight }));
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
    const removeActivity = async (req, res, next) => {
        const { activityId } = req.params;
        try {
            await pg('remove-activity', [activityId]);
            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
    return {
        removeValue,
        removeValues,
        addValue,
        addActivity,
        removeActivity,
        getValues,
    }
};
