import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: 'cfd22cf0-e01a-419f-bc11-a2a7eb936762',
  clientId: '083c94aa-15a7-47d3-9949-fb10b761c5f2',
  endpoints: {
    api: '083c94aa-15a7-47d3-9949-fb10b761c5f2',
  },
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);