import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertModel, Options } from './alert.model';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  private subject = new Subject<AlertModel>();
  private buttonClick = new Subject<Options>();
  

  constructor() { }

  set(alert: AlertModel) {
      this.subject.next(alert);
  }

  get(): Observable<AlertModel> {
      return this.subject.asObservable();
  }

  remove() {
      this.subject.next();
      this.buttonClick.next();
  }

  setButtonClick(alert_id: string, option: Options) {
    option["alert_id"] = alert_id;
      this.buttonClick.next(option);
  }

  getButtonClick(): Observable<Options> {
      return this.buttonClick.asObservable();
  }

}
