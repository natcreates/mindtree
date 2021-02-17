import {html} from 'lit-element';

export const activitiesForm = (addActivity, values) => {
    if (!values || !values.length) return;
    const options = values.map((value) => html`<option value=${value.value_id}>${value.name}</option>`);
    return html`
       <form>
        <div>
          <label>
            Name
            <input name="name" id="activityName"/>
         </label>
       </div>
       <div>
        <label>
            Value
            <select name="value" id="activityValue">
               ${options}
            </select>
        </label>
        <label>
        Weight
        <input name="weight" type="number" id="activityWeight"/>
        </label>
        </div>
        <button @click=${addActivity}>Save</button>
        </form>
        `;
};
