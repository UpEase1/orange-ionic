import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToggle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import { personCircleOutline, personCircleSharp, sunnyOutline, sunnySharp, moonSharp, moonOutline, chevronDownCircleOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import useThemeSwitcher from '../hooks/useThemeSwitcher';
import './DashboardPage.scss';
import Grades from '../components/Grades';
import Noitications from '../components/Notifications';
import Timetable from '../components/Timetable';
const DashboardPage: React.FC = () => {
  const [darkMode, toggleDarkTheme] = useThemeSwitcher();
  function toggleDarkModeHandler() {
    toggleDarkTheme();
  }
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      <IonHeader className='ion-no-borde'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonToggle
            id='darkModeToggle'
            checked={darkMode}
            onIonChange={toggleDarkModeHandler}
            color="light"
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

      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>
        <h1 id='greeting'>
          Hello Lance!
        </h1>
        <Timetable darkMode={darkMode} />
        <Grades />
        <Noitications />
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;