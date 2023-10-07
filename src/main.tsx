import React from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
import App from './App';
import config from '../graph.config';


// Microsoft Authentication Library for js
Providers.globalProvider = new Msal2Provider({
  clientId: config.appId,
  authority: `https://login.microsoftonline.com/${config.tenantId}`,
  scopes: config.scopes
});



// React Root
const container = document.getElementById('root');
const root = createRoot(container!);
root.render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// continue from here
// https://learn.microsoft.com/en-us/graph/toolkit/get-started/use-toolkit-with-react#create-a-react-app:~:text=index.tsx%20file%20will%20look-,like%20the,-following.