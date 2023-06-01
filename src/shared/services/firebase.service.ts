import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  initFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyCFVEvGRimVRYdOo_5EUd-JNVo97DOsReY",
      authDomain: "portfolio-97118.firebaseapp.com",
      projectId: "portfolio-97118",
      storageBucket: "portfolio-97118.appspot.com",
      messagingSenderId: "928632299709",
      appId: "1:928632299709:web:f378b0fc7ca3f241b8d7d4",
      measurementId: "G-QHTZTTV6E8"
    };

    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
  }
}
