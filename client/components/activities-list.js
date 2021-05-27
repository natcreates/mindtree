import {html} from 'lit-element';

export const activitiesList = (activities, logClick, removeClick) => {
    const content = activities.length ? activities.map((activity) =>
        html`<li id=${activity.activity_id} class="activity"><div class="activity-name" @click=${logClick}><div class="checkmark">&#10003;</div>${activity.name}</div><div><button class="remove-button" @click=${removeClick}>X</button></div></li>`) : 'No activities'
    return html`
       <ul>
         ${content}
       </ul>
    `;
};
