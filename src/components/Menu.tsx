import {
  IonAvatar,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, homeOutline, homeSharp,  personCircleOutline, personCircleSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.scss';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Dashboard',
    url: '/page/Dashboard',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Attendance',
    url: '/page/Attendance',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Gradesheet',
    url: '/page/Gradesheet',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Teachers',
    url: '/page/Teachers',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Internal Marks',
    url: '/page/InternalMarks',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Notifications',
    url: '/page/Notifications',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="reveal">
      <IonContent>
        <IonItem lines="none">
          <IonAvatar slot="start">
            <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </IonAvatar>
          <IonLabel>
            <h1>Lance</h1>
            <p>lance@upease.biz</p>
          </IonLabel>
          {/* <IonLabel>
                <h1>Lance</h1>
                <IonNote>lance@upease.biz</IonNote>
              </IonLabel> */}
        </IonItem>
        <IonList id="inbox-list">
          <IonListHeader>
          </IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
