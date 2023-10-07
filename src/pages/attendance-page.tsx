import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToggle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import React, { useEffect } from 'react';
import { Get, MgtTemplateProps } from '@microsoft/mgt-react'
import GraphConfig from '../../graph.config';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';

const AttendancePage: React.FC = () => {
const provider = Providers.globalProvider;
// if (provider && provider.state === ProviderState.SignedIn) {
//     provider.getAccessToken({
//         scopes: [graphConfig.scopes[1]]  // Acquiring token specifically for your FastAPI backend
//     }).then((token) => {
//         // Use the token...
//     }).catch((error) => {
//         console.error('Error acquiring token', error);
//     });
// }

return(
  <>
  </>
)}