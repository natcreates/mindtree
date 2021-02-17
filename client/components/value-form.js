import {html} from 'lit-element';

export const valueForm = (add, removeAll) => html`
       <form>
           <div>
             <label>
               Name
              <input name="name" id="valueName"/>
             </label>
           </div>
          <button @click=${add}>Save</button>
       </form>
       <button @click=${removeAll}>Remove all</button>

    `;
