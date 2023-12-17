import { IonApp, IonContent, IonLoading, IonPage, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import DashboardPage from './pages/DashboardPage';
import AttendancePage from './pages/AttendancePage';
// import config from '../graph.config';

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
import LoginPage from './pages/LoginPage';
import { UserDataType, useUser } from './hooks/UserContext';
import { Providers } from '@microsoft/mgt-element';
import { useEffect, useState } from 'react';
import LoadingPage from './pages/LoadingPage';

setupIonicReact();
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
document.body.classList.toggle('dark', prefersDark.matches);
// Listen for changes to the prefers-color-scheme media query
prefersDark.addEventListener('change', (e) => {
  console.log('changed!!');
  document.body.classList.toggle('dark', prefersDark.matches);
});
const App: React.FC = () => {
  const {userData,setUserData} = useUser()
  const provider = Providers.globalProvider;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    provider.graph.client.api('me').get()
      .then(gotMe => {
        setUserData(gotMe);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data', error);
        setIsLoading(false);
      });
  }, []);
  if(isLoading) return (
    <IonApp>
      <LoadingPage />
    </IonApp>
  )
  return (
    <IonApp>
        <IonReactRouter>
          {userData.id ? (
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Redirect from="/" to="/dashboard" exact />
                <Route path="/dashboard" component={DashboardPage} exact={true} />
                <Route path="/attendance" component={AttendancePage} exact={true} />
                {/* <Route path="/page/:name" exact={true}>
                  <Page />
                </Route> */}
              </IonRouterOutlet>
            </IonSplitPane>
          ) : (
            <>
              <Redirect to="/" exact />
              <Route path="/" component={LoginPage} exact />
            </>
          )}
        </IonReactRouter>
    </IonApp>
  );
};

export default App;

// Flow: On every reload, this component will set user data, uses loading screen