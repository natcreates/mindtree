export const fetchData = async () => {
    const response = await fetch('/values');
    if (response.ok) {
        return response.json();
    }
}

export const logActivity = async (activityId) => {
    const response = await fetch(`/activities/${activityId}`, {method: 'PUT'});
    if (response.ok) {
        return response.json();
    }
}

export const removeActivity = async (activityId) => {
    const response = await fetch(`/activities/${activityId}`, {
        method: 'DELETE',
    });

    if (response.ok) return;
}

export const addActivity = async (name, valueId, weight) => {
    const response = await fetch('/activities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, valueId, weight}),
    });
    if (response.ok) {
        const {activity_id} = await response.json();
        return activity_id;
    }
}
