import {html} from 'lit-element';

export const valuesList = (values, removeClick) => {
    const content = values.length ? values.map((value) => html`<li>${value.name}<button id=${value.value_id} @click=${removeClick}>X</button></li>`) : 'No values'
    return html`
       <ul>
         ${content}
       </ul>
    `;
};
