import React, { useState, useEffect } from 'react';
import { Providers } from '@microsoft/mgt-element';
import config from '../../graph.config';
import { MgtTemplateProps } from '@microsoft/mgt-react';

interface CustomData {
  // Define properties based on your custom API's returned data
  id: number;
  name: string;
  // ... other properties
}

/**
 * Fetch student attendance.
 *
 * @param registrationNumber - The student's registration number.
 * @param courseIds - Array of course IDs.
 * @returns Promise with fetched data.
 */
async function fetchStudentAttendance(registrationNumber: string, courseIds: string[]): Promise<any> {
  // Construct the base URL
  const baseURL = `http://localhost:8000/students/get/${registrationNumber}/attendance`;

  // Convert course IDs array to comma-separated string and append as query parameter
  const queryString = new URLSearchParams({ course_ids: courseIds.join(',') }).toString();
  const finalURL = `${baseURL}?${queryString}`;

  // Fetch data
  const response = await fetch(finalURL, { method: 'GET' });

  // Check if the request was successful
  if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  // Parse and return the JSON data
  return await response.json();
}

const CustomApiComponent: React.FC<MgtTemplateProps> = (props) => {
  const [data, setData] = useState<CustomData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extract the registration number and course IDs from the data context
  const groupData:[any] = props.dataContext.value;
  const courses = groupData.filter((group: any) => {
        if(group[`extension_${config.courseDirectoryExtensionID}_Type`] === 'Course')
        return true;
        else return false;
      })
  //! YOU ARE HERE
  useEffect(() => {
      const fetchData = async () => {
          try {
              const provider = Providers.globalProvider;
              
              const token = await provider.getAccessTokenForScopes(config.scopes[2]);
              
              console.log(token);
              
              const response = await fetch('YOUR_CUSTOM_API_ENDPOINT', {
                  method: 'GET',
                  headers: {
                      'Authorization': 'Bearer ' + token
                  }
              });

              if (response.ok) {
                  const result: CustomData = await response.json();
                  setData(result);
              } else {
                  setError('API call failed');
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

export default CustomApiComponent;


// const FetchGroupData: React.FC<MgtTemplateProps> = (props) => {
//   const groupData:[any] = props.dataContext.value;
//   console.log(groupData);
//   const courses = groupData.filter((group: any) => {
//     if(group[`extension_${GraphConfig.courseDirectoryExtensionID}_Type`] === 'Course')
//     return true;
//     else return false;
//   })
//   console.log(courses);
  
//   return (
//      <>
//      </>
//   )
// }

