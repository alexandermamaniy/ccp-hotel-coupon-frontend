import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
  ws: WebSocket;
  socketIsOpen = 1;

  createObservableSocket(user_id, hotelier_id): Observable<any> {

    let ws_url = environment.wsUrl +"?userProfileId="+user_id+"&hotelierProfileId="+hotelier_id;
    this.ws = new WebSocket(ws_url);

    return new Observable(
      observer => {

        this.ws.onmessage = (event) =>
          observer.next(event.data);

        this.ws.onerror = (event) => observer.error(event);

        this.ws.onclose = (event) => observer.complete();

        return () =>
          this.ws.close(1000, "The user disconnected");
      }
    );
  }



  sendMessage(message: string): boolean {
    if (this.ws.readyState === this.socketIsOpen) {
      this.ws.send(message);
      console.log(`Sent to server ${message}`)
      return true;
    } else {
      return false;
    }
  }
}
