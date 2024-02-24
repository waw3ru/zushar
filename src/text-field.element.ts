import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zushar-text-field')
export class TextFieldElement extends LitElement {
  @property({ type: String }) refNo = '';
  @property({ type: String }) value = '';
  @property({ type: String }) question = '';
  @property({ type: String }) hint = '';
  @property({ type: String }) autocomplete = 'off';
  @property({ type: String }) inputmode = 'text';
  @property({ type: Object }) required = {
    value: false,
    message: 'Required!',
  };
  @property({ type: Object }) pattern = {
    value: '',
    message: 'Does not match!',
  };
  @property({ type: Object }) minlength = {
    value: 1,
    message: 'Too short!',
  };
  @property({ type: Object }) maxlength = {
    value: 255,
    message: 'Too long!',
  };

  protected render() {
    return html`
      <div class="zushar--form-field">
        <label for=${this.refNo}>${this.refNo}</label>
        <div class="zushar--form-input">
          <input type="text" id=${this.refNo} .value=${this.value} />
        </div>
        <div class="zushar--form-hint">${this.hint}</div>
      </div>
    `;
  }

  protected createRenderRoot() {
    return this;
  }
}
