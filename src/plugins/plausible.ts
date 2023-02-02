import Plausible, { PlausibleOptions } from 'plausible-tracker';

export default {
  install: (app: any, options: PlausibleOptions) => {
    const { enableAutoPageviews } = Plausible(options);

    enableAutoPageviews();

    app.provide('plausible');
  },
};
