import { v4 as uuidv4 } from 'uuid';

export default ({pg, testValueUuid}) => {
    const removeValue = async (req, res, next) => {
        const { valueId } = req.params;
        try {
            await pg('mark-value-as-deleted', [valueId]);
            res.status(204);
        } catch (error) {
            next(error);
        }
    };
    const addValue = async (req, res, next) => {
        const { name, description = '' } = req.body;
        try {
            await pg('add-value', Object.values({ value_id: uuidv4(), name, description }));
            res.status(200);
        } catch (error) {
            next(error);
        }
    };
    const addActivity = async (req, res, next) => {
        const { name, description = '', weight, activityId = uuidv4(), valueId = testValueUuid } = req.body;
        try {
            await pg('add-activity', Object.values({ activityId, name, description }));
            await pg('add-weighting', Object.values({ activityId, valueId, weight }));
            res.status(200);
        } catch (error) {
            next(error);
        }
    };
    const removeActivity = async (req, res, next) => {
        const { activityId } = req.params;
        try {
            await pg('remove-activity', [activityId]);
            res.status(204);
        } catch (error) {
            next(error);
        }
    };
    return {
        removeValue,
        addValue,
        addActivity,
        removeActivity,
    }
};
