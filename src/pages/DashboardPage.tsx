import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { personCircleOutline, personCircleSharp, sunnyOutline, sunnySharp, moonSharp, moonOutline } from 'ionicons/icons';
import React from 'react';
import useThemeSwitcher from '../hooks/useThemeSwitcher';
import './DashboardPage.scss';
import Grades from '../components/Grades';
const DashboardPage: React.FC = () => {
  // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  // const [darkMode, setDarkMode] = React.useState(prefersDark.matches);
  // const toggleDarkModeHandler = () => {
  //   document.body.classList.toggle('dark', !darkMode);
  //   setDarkMode(!darkMode)
  // };
  const [darkMode, toggleDarkTheme] = useThemeSwitcher();
  function toggleDarkModeHandler() {
    toggleDarkTheme();
  }

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonToggle
          id='darkModeToggle'
            checked={darkMode}
            onIonChange={toggleDarkModeHandler}
            color="dark"
            slot="end"
          />
          <IonButtons slot="end">
            <IonButton disabled={true}>
            <IonIcon slot='icon-only' ios={darkMode ? moonOutline : sunnyOutline} md={darkMode ? moonSharp : sunnySharp} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" md={personCircleSharp} ios={personCircleOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding-horizontal ion-padding-bottom">
        <IonHeader collapse="condense" className='ion-no-border'>
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1 id='greeting' className='text-center'>
          Hello Lance!
        </h1>
        <Grades />
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;