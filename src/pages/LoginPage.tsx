import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonHeader, IonPage, IonProgressBar, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { Login as MsGraphLogin, Providers } from '@microsoft/mgt-react';
import { useUser } from "../hooks/UserContext";

const LoginPage: React.FC = () => {
  const { setUserData } = useUser();
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="card-container">
          <IonRow>
            <IonCol sizeMd="3" size="12" className="ion-padding ion-blue-bkg">
              <img
                src="https://images.prismic.io/ionicframeworkcom/ac68e1d9-9887-4e5a-9820-9290d06638de_ionic+logo+white+on+blue.png"
                alt="Ionic logo"
                loading="lazy"
              />
            </IonCol>
            <IonCol size="12" sizeMd="9" className="welcome">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    Welcome to Upease Student Lifecycle
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <MsGraphLogin className='ms-login' id='login'
                    loginCompleted={(e) => {
                      
                      Providers.globalProvider.graph.client.api('me').get()
                        .then(gotMe => setUserData(gotMe));
                    }}
                  />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage;