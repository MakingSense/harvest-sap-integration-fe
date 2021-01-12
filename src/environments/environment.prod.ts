import { defaults } from './defaults';

export const environment = {
  ...defaults,
  apiBaseUrl: 'http://harvest-2-sap.makingsense.com/api',
  authCallbackUrl: 'http://harvest-2-sap.makingsense.com/auth/callback',
  production: true
};
