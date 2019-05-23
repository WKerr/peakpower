// import { Observable, from, interval } from 'rxjs/add';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class FeatureService {
  private url = 'http://localhost:3000';
  private socket;

  private POLLING_INTERVAL = 600; // in milliseconds

  constructor() {
    this.socket = io(this.url);
  }
/*
  public poll() {
    return timer(0, this.POLLING_INTERVAL).pipe(

    )
  }

  private getFeature() {
    const feature$ = this.http.get(this.url);
  }*/

  public getUnique = () => {
    return Observable.create((observer) => {
      this.socket.on('unique', (features) => {
        observer.next(features);
      })
    })
  };

  public getFeatures = () => {
    return Observable.create((observer) => {
      this.socket.on('features', (features) => {
        observer.next(features);
      })
    })
  }
}
