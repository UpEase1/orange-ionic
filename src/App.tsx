import { IonApp, IonContent, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
// import Page from './pages/Page';
import DashboardPage from './pages/DashboardPage';
import config from '../graph.config';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import useThemeSwitcher from './hooks/useThemeSwitcher';

// Auth
import { AuthProvider, initializeAuthentication, useAuth } from './context/authContext';
import { useEffect, useState } from 'react';


setupIonicReact();
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
document.body.classList.toggle('dark', prefersDark.matches);
// Listen for changes to the prefers-color-scheme media query
prefersDark.addEventListener('change', (e) => {
  console.log('changed!!');
  document.body.classList.toggle('dark', prefersDark.matches);
});

const MyApp: React.FC = () => {
  const { setToken, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      // Modified initialization function to work with a callback
      initializeAuthentication(config.appId, config.scopes, setToken)
    .then(() => {
        console.log('Authentication and token retrieval successful');
        console.log(token);
        setIsLoading(false);
    })
    .catch((error) => {
        console.error('Error during authentication or token acquisition', error);
    });

  }, [setToken]);

  if (isLoading) {
      return <div>Loading...</div>; // or any loading indicator component
  }

  return (
      <IonContent>
          <IonReactRouter>
              <IonSplitPane contentId="main">
                  <Menu />
                  <IonRouterOutlet id="main">
                      <Route path="/" exact={true}>
                          <Redirect to="/dashboard" />
                      </Route>
                      <Route path="/dashboard" exact={true}>
                          <DashboardPage />
                      </Route>
                      {/* ... */}
                  </IonRouterOutlet>
              </IonSplitPane>
          </IonReactRouter>
      </IonContent>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <MyApp />
      </AuthProvider>
    </IonApp>
  );
};

export default App;
