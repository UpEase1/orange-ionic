import * as echarts from 'echarts/core';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { use } from 'echarts';
import { useEffect, useState } from 'react';
import './Timetable.scss';
import useThemeSwitcher from '../hooks/useThemeSwitcher';
import { IonSkeletonText } from '@ionic/react';

echarts.use([TitleComponent , TooltipComponent, GridComponent, BarChart, SVGRenderer]);
interface TimetableProps {
  darkMode: boolean
}
function Timetable({ darkMode }: TimetableProps) {
  // reload the component once page loads
  const [loaded, setLoaded] = useState(false);
function updateChart(echartRef:ReactEChartsCore) {
  if(!echartRef) return;
  const echartInstance = echartRef.getEchartsInstance();
  window.addEventListener('resize', function() {
    echartInstance.resize();
  });
}


  let option = {
    // backgroundColor: '#373737',
    title: {
      show: true,
      text: 'Attendance',
      left: 'center',
      textStyle: {
        color: darkMode ? '#d7d8da' : '#1e2023',
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      containLabel: true,
      left: '5%',
      right: '5%',
      top: '15%',
      bottom: '5%',
    },
    xAxis: {
      axisType: 'category',
      data: [
        'CS-105',
        'ICT-4456',
        'MATH-5043',
        'CS-105',
        'ICT-4356',
        'MATH-5443'
      ],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        rotate: 30,
        // color: window.getComputedStyle(document.documentElement).getPropertyValue('--ion-color-dark-shade'),
        color: darkMode ? '#d7d8da' : '#1e2023',
      }
    },
    yAxis: {
      axisLabel: {
        formatter: '{value}%',
        // color: window.getComputedStyle(document.documentElement).getPropertyValue('--ion-color-dark-shade'),
        color: darkMode ? '#d7d8da' : '#1e2023',
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
        lineStyle: {
          opacity: 0.6,
          // color: window.getComputedStyle(document.documentElement).getPropertyValue('--ion-color-dark-shade'),
          color: darkMode ? '#d7d8da' : '#1e2023',
        }
      },
      min: 60,
      max: 100
    },
    series: [
      {
        type: 'bar',
        barWidth: '30%',
        // label: {
        //   show: true,
        //   fontSize: 16,
        //   position: 'top',
        //   opacity: 1,
        //   // color: window.getComputedStyle(document.documentElement).getPropertyValue('--ion-color-dark-shade'),
        //   color: darkMode ? '#d7d8da' : '#1e2023',
        // },

        data: [
          76,
          79,
          90,
          {
            value: 73,
            itemStyle: {
              color: '#f0685e',
              shadowColor: '#f52d28',
              borderColor: '#f52d28',
              borderType: 'dashed',
              opacity: 0.5
            }
          },
          98,
          86
        ],
        itemStyle: {
          borderRadius: [50, 50, 50, 50], // Specify the border radius
          borderType: 'solid',
          color: '#5ce2ab',
          // borderColor: '#106d00',
          // shadowColor: '#5470c6',
          // shadowBlur: 2
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
          borderRadius: [50, 50, 50, 50], // Specify the border radius
          borderType: 'solid',
        }
      }
    ]
  };
  onload = () => {
    setLoaded(true);
  }
  // useEffect(() => {
  //   console.log(darkMode);
  // }, [darkMode]);

  // option && myChart.setOption(option);
  return (
    <div className='timetable-component'>
      {loaded.valueOf() ? <div className='timetable-graph'>
        <ReactEChartsCore
          loadingOption={null}
          echarts={echarts}
          option={option}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          ref={(e) => { updateChart(e!); }}
        // opts={{ renderer: 'canvas' }}
        />
      </div> : 
      <div>
        <IonSkeletonText animated={true} style={{ width: '100%', height: '300px' }}></IonSkeletonText>
      </div>}
    </div>
  );
}

export default Timetable;