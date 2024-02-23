import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

// TODO: delete this component
@customElement('zushar-demo')
export class Demo extends LitElement {
  static styles = css`
    cssTheme,
    :host {
      color: var(--zushar-error-color);
    }
  `;

  render() {
    return html`Add your component template here`;
  }
}
