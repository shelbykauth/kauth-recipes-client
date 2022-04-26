import { getWindowConfig } from './get-window-config.fn';

let windowConfig = getWindowConfig();

export const environment = Object.assign({}, windowConfig, {
  production: true,
});
