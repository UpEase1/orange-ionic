import React, { useState, useEffect } from 'react';
import { Providers } from '@microsoft/mgt-element';
import config from '../../graph.config';
import { MgtTemplateProps } from '@microsoft/mgt-react';
import env from '../../env';

interface data {
  id: string
}
//! DEFINE A DATA TYPE FOR THE RESPONSE (e.g. interface AttendanceData)
const AttendanceDataComponent: React.FC<MgtTemplateProps> = (props) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extract the registration number and course IDs from the data context (prop)
  const groupData:any[] = props.dataContext.value;
  const courseIds = groupData.map(
    group => {
      return group[`extension_${config.courseDirectoryExtensionID}_Type`] === 'Course'? group.id as string : null;
    }
    ).filter(courseId => courseId !== null) as string[];
  console.log("COURSE IDS: " + courseIds);

  useEffect(() => {
      const fetchData = async () => {
          try {
              // get token
              const provider = Providers.globalProvider;
              const token = await provider.getAccessTokenForScopes(config.unifiedApiScope);
              

              // Construct the base URL
              const registrationNumber = '210914049'; //!TEMP
              const baseURL = `${env.API_URL}/${env.API_VERSION}students/get/${registrationNumber}/attendance`;
              console.log("BASE_URL " + baseURL);
              console.log("COURSE_IDS " + courseIds);
              console.log("Token " + token);
              
              // Convert course IDs array to comma-separated string and append as query parameter
              const queryString = new URLSearchParams({ course_ids: courseIds.join(',') }).toString();
              const finalURL = `${baseURL}?${queryString}`;
              console.log("FINAL_URL " + finalURL);
              // Fetch data
              const response = await fetch(finalURL, 
                { 
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
              
              if (response.ok) {
                  const result: any = await response.json();
                  setData(result);
              } else {
                  setError('API call failed: ' + response.statusText);
              }
          } catch (err: any) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, []);

  return (
      <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {data && (
              <div>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
          )}
      </div>
  );
}

export default AttendanceDataComponent;

