import React from 'react';
import { IonContent, IonPage, IonicSlides } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import { removeOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/keyboard';
import 'swiper/scss/pagination';
import '@ionic/react/css/ionic-swiper.css';
import './Grades.scss'

const Home: React.FC = () => {
  return (
    <div className='grades-component'>
      <Swiper
        modules={[Navigation, Keyboard, Pagination, IonicSlides]}
        keyboard={true}
        navigation={true}
        pagination={true}
        className='square-box'
      >
        <SwiperSlide>
          <div className="gpa">8.8</div>
          <div className="sem">1st sem</div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="gpa">8.0</div>
            <div className="sem">2nd sem</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="gpa">8.3</div>
            <div className="sem">3rd sem</div>
          </div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        modules={[Navigation, Keyboard, Pagination, IonicSlides]}
        keyboard={true}
        navigation={true}
        pagination={true}
        className='square-box'
      >
        <SwiperSlide>
          <div className="internal-marks-header">Internal Marks</div>
          <div className="internal-marks-content">
            <div className="internal-marks-numerator">25</div>
            <IonIcon slot='icon-only' icon={removeOutline} />
            <div className="internal-marks-denominator">50</div>
          </div>
          <div className="internal-marks-footer">BME</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="internal-marks-header">Internal Marks</div>
          <div className="internal-marks-content">
            <div className="internal-marks-numerator">25</div>
            <IonIcon slot='icon-only' icon={removeOutline} />
            <div className="internal-marks-denominator">50</div>
          </div>
          <div className="internal-marks-footer">BME</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="internal-marks-header">Internal Marks</div>
          <div className="internal-marks-content">
            <div className="internal-marks-numerator">25</div>
            <IonIcon slot='icon-only' icon={removeOutline} />
            <div className="internal-marks-denominator">50</div>
          </div>
          <div className="internal-marks-footer">BME</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Home;