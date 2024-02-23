import { LitElement } from 'lit';

export const openComponentConfig: ShadowRootInit = {
  ...LitElement.shadowRootOptions,
  mode: 'open',
  delegatesFocus: true,
};
