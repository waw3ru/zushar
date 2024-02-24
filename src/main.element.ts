import './editor.js';
import './main.scss';

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

const styles = css`
  :host {
    position: relative;
    color: var(--zushar-dark-color);
    display: block;
    overflow: hidden;
    font-size: var(--zushar-font-size);
    margin: 0;
    padding: 0;
  }
`;

@customElement('zushar-form')
export class ZusharFormElement extends LitElement {
  static styles = [styles];

  template = () => html`
    <div id="zushar_forms_v2_alpha">
      <zushar-form-editor></zushar-form-editor>
    </div>
  `;

  protected render() {
    return this.template();
  }

  protected createRenderRoot() {
    return this;
  }
}
