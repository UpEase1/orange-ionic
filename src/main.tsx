import React from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
import App from './App';
import config from '../graph.config';
import { UserProvider } from './hooks/UserContext';

// Microsoft Authentication Library for js
Providers.globalProvider = new Msal2Provider({
  clientId: config.appId,
  authority: `https://login.microsoftonline.com/${config.tenantId}`,
  scopes: config.scopes
});
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <UserProvider >
      <App />
    </UserProvider>
  </React.StrictMode>
);

