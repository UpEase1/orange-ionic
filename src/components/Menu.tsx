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
import { Login as MsGraphLogin, applyTheme } from '@microsoft/mgt-react';
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
    url: '/dashboard',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Attendance',
    url: '/attendance',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Gradesheet',
    url: '/gradesheet',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Teachers',
    url: '/teachers',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Internal Marks',
    url: '/internalmarks',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Notifications',
    url: '/notifications',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
];


const Menu: React.FC = () => {
  const location = useLocation();
  return (
    <IonMenu contentId="main" type="reveal">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader lines='full'>
            <MsGraphLogin className='ms-login' id='login' />
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
