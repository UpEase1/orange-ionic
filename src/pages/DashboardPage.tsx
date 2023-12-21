import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToggle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import { personCircleOutline, personCircleSharp, sunnyOutline, sunnySharp, moonSharp, moonOutline, chevronDownCircleOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import useThemeSwitcher from '../hooks/useThemeSwitcher';
import './DashboardPage.scss';
import Grades from '../components/Grades';
import Noitications from '../components/Notifications';
import Timetable from '../components/Timetable';
import Calendar from '../components/Calendar';
import { Get, MgtTemplateProps } from '@microsoft/mgt-react';
import GraphConfig from '../../graph.config';
import {UserDataType, useUser} from '../hooks/UserContext'
import Attendance from '../components/Attendance';

const DisplayName: React.FC<MgtTemplateProps> = (props) => {
  const data = props.dataContext;
  return (
      <h1 id='greeting' slot="data">
        <div className="welcome">Hello {data.displayName}!</div>
      </h1>
  )
}
const DashboardPage: React.FC = () => {
  const [darkMode, toggleDarkTheme] = useThemeSwitcher();
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
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
            onIonChange={toggleDarkTheme}
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
        <Get resource="me?$select=displayName,id,userPrincipalName,faxNumber,jobTitle" cacheEnabled={true} >
          <DisplayName /> 
        </Get>
        {/* <Get resource={`me/memberOf/microsoft.graph.group?$filter=groupTypes/any(c:c+eq+'Unified')`} cacheEnabled={true} >
          <FetchGroupData />
        </Get> */}
        {/* <Timetable darkMode={darkMode} /> */}
        <Attendance darkMode= {darkMode}></Attendance>
        <Grades />
        <Noitications />
        <Calendar />
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;