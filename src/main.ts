import './app/editor.js';
import './main.scss';

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

const styles = css`
  :host {
    position: relative;
    font-family: var(--zushar-font-family);
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
  static styles = [styles];

  protected render() {
    return html`<zushar-form-editor></zushar-form-editor>`;
  }
  protected createRenderRoot() {
    return this;
  }
}
