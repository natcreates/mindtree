import { v4 as uuidv4 } from 'uuid';

export default ({pg}) => {
    const removeValue = async (req, res, next) => {
        try {
            await pg('mark-value-as-deleted', [req.params.valueId]);
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
        const { name, description = '', value, weight } = req.body;

        try {
            await pg('add-activity', Object.values({ activity_id: uuidv4(), description, name, weight, value }));
            res.status(200);
        } catch (error) {
            next(error);
        }
    };
    const removeActivity = async (req, res, next) => {
        try {
            await pg('remove-activity', Object.values({ activity_id: req.params.activityId }));
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
