import { v4 as uuidv4 } from 'uuid';

const calculateBalance = (values) => {
    const total = values.reduce((acc, value) => acc + value.score, 0);
    return values.map((value) => ({ percentage: (value.score / total) * 100, ...value }));
};

export default ({pg, testValueUuid}) => {
    const getValues = async (req, res, next) => {
        try {
            const values = await pg('read-values');
            const activities = await pg('read-activities');
            return res.status(200).send({ values: calculateBalance(values), activities });
        } catch (error) {
            next(error);
        }
    };
    const removeValue = async (req, res, next) => {
        const { valueId } = req.params;
        try {
            await pg('mark-value-as-deleted', [valueId]);
            await pg('mark-weightings-as-deleted', [valueId]);
            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
    const removeValues = async (req, res, next) => {
        try {
            await pg('mark-all-values-as-deleted');
            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
    const addValue = async (req, res, next) => {
        const { name, description = '' } = req.body;
        const value_id = uuidv4();
        try {
            await pg('add-value', Object.values({ value_id, name, description }));
            return res.status(200).send({ value_id });
        } catch (error) {
            next(error);
        }
    };
    const addActivity = async (req, res, next) => {
        const { name, description = '', weight, activity_id = uuidv4(), valueId = testValueUuid } = req.body;
        try {
            await pg('add-activity', Object.values({ activity_id, name, description }));
            await pg('add-weighting', Object.values({ activity_id, valueId, weight }));
            return res.status(200).send({ activity_id });
        } catch (error) {
            next(error);
        }
    };
    const removeActivity = async (req, res, next) => {
        const { activityId } = req.params;
        try {
            await pg('mark-activity-as-deleted', [activityId]);
            await pg('mark-weightings-as-deleted', [activityId]);
            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };
    const logActivity = async (req, res, next) => {
        const { activityId } = req.params;
        try {
            const response = await pg('log-activity', [activityId]);
            const valueIds = response.map(({ value_id }) => value_id);
            return res.status(200).send({ valueIds });

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
        logActivity,
        getValues,
    }
};
