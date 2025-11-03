import React from "react";
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Home: React.FC = () => {
  return (
    <IonSplitPane when="xs" contentId="main">
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">Menu Content</IonContent>
      </IonMenu>

      <IonPage className="bg-red-300" id="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Main View</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">Main View Content</IonContent>
      </IonPage>
    </IonSplitPane>
  );
};
export default Home;
