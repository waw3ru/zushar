import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-app')
export class LitApp extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property() name = 'to Zushar Version 2';

  render() {
    return html`<h1>Hello, ${this.name}</h1>`;
  }
}
