import './editor.js';
import './main.scss';

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { openComponentConfig } from './utils.js';

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
export class ZusharForm extends LitElement {
  static shadowRootOptions = openComponentConfig;

  static styles = [styles];

  protected render() {
    return html`
      <div id="zushar_forms_v2_alpha">
        <zushar-form-editor></zushar-form-editor>
      </div>
    `;
  }
  protected createRenderRoot() {
    return this;
  }
}
