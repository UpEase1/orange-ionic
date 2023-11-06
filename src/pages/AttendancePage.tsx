import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import CustomApiComponent from '../components/CustomApiComponent';
import { Get } from '@microsoft/mgt-react';

const AttendancePage: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent >
        <Get resource={`me/memberOf/microsoft.graph.group?$filter=groupTypes/any(c:c+eq+'Unified')`} cacheEnabled={true} >
          <CustomApiComponent/>
        </Get>
        {/* <Get resource="me?$select=displayName,id,userPrincipalName,faxNumber,jobTitle" cacheEnabled={true} >

        </Get> */}
        {/* <Temp /> */}
        
      </IonContent>
    </IonPage>
  );
};

// import React, { useState, useEffect } from 'react';
// import { Providers } from '@microsoft/mgt-element';
// import config from '../../graph.config';
// const Temp: React.FC = (props) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//       const fetchData = async () => {
//           try {
//               const provider = Providers.globalProvider;
              
//               const token = await provider.getAccessTokenForScopes(config.unifiedApiScope);
              
//               console.log(token);
              
//               const response = await fetch('http://localhost:8000/students/get/', {
//                   method: 'GET',
//                   headers: {
//                       'Authorization': 'Bearer ' + token
//                   }
//               });

//               if (response.ok) {
//                   const result = await response.json();
//                   console.log(result);
//               } else {
//                   setError('API call failed');
//               }
//           } catch (err: any) {
//               setError(err.message);
//           } finally {
//               setLoading(false);
//           }
//       };

//       fetchData();
//   }, []);

//   return (
//       <div>
//           OPEN CONSOLE
//       </div>
//   );
// }

export default AttendancePage;
