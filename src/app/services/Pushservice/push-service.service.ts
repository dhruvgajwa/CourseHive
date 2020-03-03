import { Injectable } from '@angular/core';
import {AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PushServiceService {

  constructor(private db: AngularFireDatabase) { 
   
  }
 

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  sendpushSubscriptionObjectToServer(pushSubscription: string, userID: string){  // pushSubscription has to be json string
    // 
    return this.db.object(`PushObject/${userID}`).set(pushSubscription);
  }

  getpushSubscriptionObjectFromServer(userID: string){
     return this.db.object(`PushObject/${userID}`).valueChanges().pipe(take(1)); ;
  }
}
