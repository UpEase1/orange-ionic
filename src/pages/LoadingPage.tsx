import React, { useState, useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import './LoadingPage.scss'; // Import the CSS file for styles

const LoadingPage = () => {

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="bookshelf_wrapper">
          <ul className="books_list">
            <li className="book_item first"></li>
            <li className="book_item second"></li>
            <li className="book_item third"></li>
            <li className="book_item fourth"></li>
            <li className="book_item fifth"></li>
            <li className="book_item sixth"></li>
          </ul>
          <div className="shelf"></div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default LoadingPage;
