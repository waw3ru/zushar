import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zushar-hidden-field')
export class HiddenFieldElement extends LitElement {
  @property({ type: String }) refNo = '';

  @property({ type: String }) value = '';

  protected render() {
    return html`
      <div class="zushar-form-field">
        <input type="hidden" id=${this.refNo} .value=${this.value} />
      </div>
    `;
  }
}
