import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr'
import annotationPlugin from 'chartjs-plugin-annotation';
import './Attendance.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  ChartOptions,
  BarControllerChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { UserDataType, useUser } from '../hooks/UserContext';
import { Get, MgtTemplateProps, Providers } from '@microsoft/mgt-react';
import config from '../../graph.config';
import env from '../../env';
import { IonSkeletonText } from '@ionic/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  annotationPlugin,
  Title,
  Tooltip,
);
type AttendanceGraphType = MgtTemplateProps & {
  userData: UserDataType
}
type BarChartOptions = ChartOptions<"bar"> & BarControllerChartOptions;
type AttendanceStatus = 'P' | 'A'; // 'P' for Present, 'A' for Absent
interface AttendanceRecord {
  [date: string]: AttendanceStatus;
}
interface CourseAttendance {
  course_id: string;
  course_name: string;
  attendance_record: AttendanceRecord;
  attendance_percentage: number;
}
type AttendanceData = CourseAttendance[];

// Function to fetch data using axios
const fetchData = async (url: string) => {
  const provider = Providers.globalProvider;
  const token = await provider.getAccessTokenForScopes(config.unifiedApiScope);
  const response = await axios.get(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data as AttendanceData;
};

const AttendanceGraph: React.FC<AttendanceGraphType> = (props) => {
  const { userData, dataContext } = props;

  // Extract the registration number and course IDs from the data context (prop)
  const groupData: any[] = dataContext.value;
  const courseIds = groupData.map(
    group => {
      return group[`extension_${config.courseDirectoryExtensionID}_Type`] === 'Course' ? group.id as string : null;
    }
  ).filter(courseId => courseId !== null) as string[];

  // Construct the URL for SWR
  const studentId = userData.id;
  const baseURL = `${env.API_URL}/${env.API_VERSION}/students/${studentId}/attendance`;
  const queryString = new URLSearchParams({ course_ids: courseIds.join(',') }).toString();
  const finalURL = `${baseURL}?${queryString}`;

  // Use SWR for data fetching
  const { data, error, isLoading } = useSWR(finalURL, fetchData);

  // Finding min attendance for chart optoins
  const minAttendancePercentage = data?.reduce((min, current) => {
    return current.attendance_percentage < min ? current.attendance_percentage : min;
  }, Infinity);

  const options: BarChartOptions = {
    scales: {
      x: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          // drawBorder: false,
          display: false, // Remove gridlines on the x-axis
        },
        border: {
          display: false
        }

      },
      y: {
        beginAtZero: false,
        min: minAttendancePercentage? minAttendancePercentage - 10 : 60 ,
        max: 100,
        ticks: {
          // forces step size to be 50 units
          stepSize: 10,
          color: '#ffffff',
          font: {
            size: 14,
            weight: 'bold'
          },
          callback: (tickValue: string | number) => `${tickValue}%`,
        },
        grid: {
          // drawBorder: false,
          display: false, // Remove gridlines on the x-axis
        },
        border: {
          display: false
        }
      },

    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 75,
            yMax: 75,
            borderColor: 'white',
            borderWidth: 1,
            borderDash: ([10, 10]),
          }
        }
      },

      title: {
        display: true,
        text: 'Attendance',
        color: '#ffffff',
        font: {
          size: 20,
          weight: 'bold'
        }
      },
    },
    elements: {
      bar: {
        borderRadius: {
          topRight: 50,
          bottomRight: 50,
          bottomLeft: 50,
          topLeft: 50,
        },
      },
    },
  };
  if (isLoading) return <IonSkeletonText animated={true} style={{ width: '100%', height: '300px' }} />
  if (error) return <div>Error popup/copmonent or something</div>

  const backgroundColors = data!.map(value => (value.attendance_percentage < 75 ? '#FF8A00' : '#F8FBF5'));
  const d = {
    labels: data?.map((val: CourseAttendance) => {
      let match = val.course_name.match(/-\s*([^\s]+)$/);
      if (match) return match[1]
      else throw Error(`${val} doesn't follow course_name format of 'Name-Initials'`)
    }),
    datasets: [
      {
        data: data?.map((val)=>val.attendance_percentage),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
        borderWidth: 1,
        borderRadius: {
          topRight: 50,
          bottomRight: 50,
          bottomLeft: 50,
          topLeft: 50,
        },
        barThickness: 20,

      },

    ],
  };
  return (
    <div className='attendance-component'>
      <Bar options={options} data={d} />
    </div>
  );
}

const Attendance: React.FC = () => {
  const { userData } = useUser()
  return (
    <Get resource={`me/memberOf/microsoft.graph.group?$filter=groupTypes/any(c:c+eq+'Unified')`} cacheEnabled={true} >
      <AttendanceGraph userData={userData} />
    </Get>
  )
}

export default Attendance;