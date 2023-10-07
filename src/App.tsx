import { IonApp,IonContent, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import DashboardPage from './pages/DashboardPage';
import AttendacePage from './pages/AttendancePage';
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

setupIonicReact();
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
document.body.classList.toggle('dark', prefersDark.matches);
// Listen for changes to the prefers-color-scheme media query
prefersDark.addEventListener('change', (e) => {
  console.log('changed!!');
  document.body.classList.toggle('dark', prefersDark.matches);
});
const App: React.FC = () => {
  
  return (
    <IonApp>
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
            <Route path="/attendance" exact={true}>
              <AttendacePage />
            </Route>
            {/* <Route path="/page/:name" exact={true}>
              <Page />
            </Route> */}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
