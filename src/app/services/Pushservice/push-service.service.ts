
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PushServiceService {

  constructor() { }
  // addSubscriber(subscription) {

  //   const url = `${this.API_URL}/webpush`;
  //   console.log('[Push Service] Adding subscriber')

  //   let body = {
  //     action: 'subscribe',
  //     subscription: subscription
  //   }

  //   return this.http
  //     .post(url, body)
  //     .catch(this.handleError);

  // }

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
}
