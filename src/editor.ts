import './text-field.element.js';

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { openComponentConfig } from './utils';

@customElement('zushar-form-editor')
export class LitApp extends LitElement {
  static shadowRootOptions = openComponentConfig;

  @property() projectName = 'to Zushar Version 2';

  protected render() {
    return html` <zushar-text-field></zushar-text-field> `;
  }
  protected createRenderRoot() {
    return this;
  }
}
