import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  loadings: Observable<boolean> = Observable.of(false);
  constructor() { }

  fireLoader(){
    this.loadings = Observable.of(true);
  }

  stopLoader(){
    this.loadings = Observable.of(false);
  }
}
