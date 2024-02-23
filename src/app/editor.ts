import './demo.js';

import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zushar-form-editor')
export class LitApp extends LitElement {
  static styles = [
    css`
      .txt-bold {
        color: var(--zushar-primary-color);
      }
    `,
  ];

  @property() name = 'to Zushar Version 2';

  render() {
    return html`
      <p class="txt-bold">Hello, ${this.name} <zushar-demo></zushar-demo></p>
    `;
  }
}
