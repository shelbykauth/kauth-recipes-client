const WindowConfigNotFoundErrorMessage = `Cannot find window-based config.
Please include a script, before the angular main.ts, which sets the config for the window.
\`window.ng_recipesClient_config = {
  apiUrl: "/api/",
};\`
`;

export const defaultConfig = {
  apiUrl: '/api/',
};

export function getWindowConfig(): AppConfig {
  let windowConfig = (window as any).ng_recipesClient_config;
  if (!windowConfig) {
    console.error(WindowConfigNotFoundErrorMessage);
    windowConfig = {};
  }
  // hand-pick each value
  return {
    apiUrl: windowConfig.apiUrl || defaultConfig.apiUrl,
  };
}

export type AppConfig = {
  apiUrl: string;
};
