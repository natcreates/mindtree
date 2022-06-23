import {html} from 'lit-element';

export const valuesList = (values, removeClick) => {
    const content = values.length ? values.map((value) => html`<li id=${value.value_id} class="value">${value.name}<div class="score">${value.score}</div><button class="remove-button" @click=${removeClick}>X</button></li>`) : 'No values'
    return html`
       <ul>
         ${content}
       </ul>
    `;
};
