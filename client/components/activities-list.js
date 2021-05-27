import {html} from 'lit-element';

export const activitiesList = (activities, removeClick) => {
    const content = activities.length ? activities.map((activity) => html`<li>${activity.name}<button id=${activity.activity_id} @click=${removeClick}>X</button></li>`) : 'No activities'
    return html`
       <ul>
         ${content}
       </ul>
    `;
};
