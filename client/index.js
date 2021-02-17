import {LitElement, html} from 'lit-element';
import { valuesList } from "./components/values-list";
import { valueForm } from "./components/value-form";
import { activitiesForm } from "./components/activities-form";

const errorMessage = html`<p style="color: red;">There was a problem saving your changes.</p>`;

class MindtreeApp extends LitElement {
    static get properties() {
        return {
            values: { type: Array },
            activities: { type: Array },
            error: { type: Boolean },
        }
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.values) {
            this.fetchData();
        }
    }

    async fetchData() {
        const response  = await fetch('/values');
        const json = await response.json();
        this.values = json.values;
        this.activities = json.activities;
    }

    async _addValue(e) {
        e.preventDefault();
        e.stopPropagation();
        const input = this.shadowRoot.getElementById('valueName');
        const name = input.value;
        try {
            await fetch('/values', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });
            input.value = '';
            this.values = [
                ...this.values,
                { name }
            ];
            this.error = false;
        } catch (error) {
            console.log(error);
            this.error = true;
        }
    }

    _removeValue() {
        return async (valueId) => {
            const input = this.shadowRoot.getElementById('valueName');
            const name = input.value;
            try {
                const response  = await fetch(`/values/${valueId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    input.value = '';
                    this.error = false;
                    this.values = [
                        ...this.values,
                        { name }
                    ];
                }
            } catch (error) {
                console.log(error);
                this.error = true;
            }
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
                body: JSON.stringify({ name, valueId, weight }),
            });
            if (response.ok) {
                activityNameInput.value = '';
                activityValueInput.value = '';
                activityWeightInput.value = '';
                this.error = false;
                return this.activities = [
                    ...this.activities,
                    { name, weight, value_id: valueId }
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
            const response = await fetch('/values', { method: 'DELETE' });
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

    render() {
        return html`
               <h2>Values</h2>
               ${valuesList(this.values, this._removeValue)}
               ${valueForm(this._addValue, this._removeAllValues)}
               <h2>Activities</h2>
               ${activitiesForm(this._addActivity, this.values)}

               ${this.error ? errorMessage : ''}
            `;
    }
}

customElements.define('mindtree-app', MindtreeApp);
