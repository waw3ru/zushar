import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { openComponentConfig } from './utils';

@customElement('zushar-form-editor')
export class LitApp extends LitElement {
  static shadowRootOptions = openComponentConfig;

  @property() name = 'to Zushar Version 2';

  protected render() {
    return html` <p class="border">Hello, ${this.name}</p> `;
  }
  protected createRenderRoot() {
    return this;
  }
}
