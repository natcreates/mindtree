import {LitElement, html} from 'lit-element';
import {valuesList} from "./components/values-list";
import {valueForm} from "./components/value-form";
import {activitiesForm} from "./components/activities-form";
import {activitiesList} from "./components/activities-list";
import styles from "./styles";
import {animate} from "./components/animate";

const errorMessage = html`<p style="color: red;">There was a problem saving your changes.</p>`;

class MindtreeApp extends LitElement {
    static get properties() {
        return {
            values: {type: Array},
            activities: {type: Array},
            error: {type: Boolean},
        }
    }

    static get styles() {
        return styles;
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this.values) {
            this.fetchData();
        }
    }

    async fetchData() {
        const response = await fetch('/values');
        const json = await response.json();
        this.values = json.values;
        this.activities = json.activities;
        animate(json.values);
    }

    async _addValue(e) {
        e.preventDefault();
        e.stopPropagation();
        const input = this.shadowRoot.getElementById('valueName');
        const name = input.value;
        try {
            const response = await fetch('/values', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name}),
            });
            if (response.ok) {
                const { value_id } = await response.json();
                input.value = '';
                this.values = [
                    ...this.values,
                    {name, value_id}
                ];
                this.error = false;
            } else {
                throw new Error('Bad response')
            }
        } catch (error) {
            console.log(error);
            this.error = true;
        }
    }

    async _removeValue(e) {
        const valueId = e.target.parentNode.id;
        try {
            const response = await fetch(`/values/${valueId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                this.error = false;
                this.values = this.values.filter((value) => value.value_id !== valueId);
            }
        } catch (error) {
            console.log(error);
            this.error = true;
        }
    }

    async _addActivity(e) {
        e.preventDefault();
        e.stopPropagation();
        const activityNameInput = this.shadowRoot.getElementById('activityName');
        const activityValueInput = this.shadowRoot.getElementById('activityValue');
        const activityWeightInput = this.shadowRoot.getElementById('activityWeight');
        const name = activityNameInput.value;
        const valueId = activityValueInput.value;
        const weight = activityWeightInput.value;
        try {
            const response = await fetch('/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, valueId, weight}),
            });
            if (response.ok) {
                const { activity_id } = await response.json();
                activityNameInput.value = '';
                activityValueInput.value = '';
                activityWeightInput.value = '';
                this.error = false;
                return this.activities = [
                    ...this.activities,
                    {name, weight, value_id: valueId, activity_id}
                ];
            } else {
                throw error;
            }

        } catch (error) {
            console.log(error);
            this.error = true;
        }
    }

    async _removeAllValues() {
        try {
            const response = await fetch('/values', {method: 'DELETE'});
            if (response.ok) {
                this.error = false;
                return this.values = [];
            }
            throw error;
        } catch (error) {
            console.log(error);
            this.error = true;
        }
    }

    async _removeActivity(e) {
        const activityId = e.target.parentNode.parentNode.id;
        try {
            const response = await fetch(`/activities/${activityId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                this.activities = this.activities.filter((activity) => activity.activity_id !== activityId);
            }
        } catch (error) {
            console.log(error);
            this.error = true;
        }
    }

    async _logActivity(e) {
        // TODO work out what happens when all associated values are deleted. Prompt user to select new value?
        const activityId = e.target.parentNode.parentNode.id;
        console.log('activityId', activityId);
        try {
            const response = await fetch(`/activities/${activityId}`, {method: 'PUT'});
            if (response.ok) {
                this.error = false;
                const { valueIds } = await response.json();
                valueIds.forEach((valueId) => {
                    const value = this.shadowRoot.getElementById(valueId);
                    value.firstElementChild.classList.add('increase');
                })

                return this.fetchData();
            }
            console.log('response.status', response.status);
            const error = new Error('Problem logging activity')
            throw error;
        } catch (error) {
            console.log(error);
            this.error = true;
        }
    }

    render() {
        return html`
            <h2>Values</h2>
            ${valuesList(this.values, this._removeValue)}
            ${valueForm(this._addValue, this._removeAllValues)}
            <h2>Activities</h2>
            ${activitiesForm(this._addActivity, this.values)}
            ${activitiesList(this.activities, this._logActivity, this._removeActivity)}
            ${this.error ? errorMessage : ''}
            <slot></slot>
        `;
    }
}

customElements.define('mindtree-app', MindtreeApp);
