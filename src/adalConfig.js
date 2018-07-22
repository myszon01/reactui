import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: '3b3c3125-1d26-40fe-9912-89aba1e3cf32',
  clientId: '70ec488c-e66c-4342-97e4-cbe3812b026e',
  endpoints: {
    api: '70ec488c-e66c-4342-97e4-cbe3812b026e',
  },
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);