import { Component, OnInit, AfterViewInit, OnDestroy , ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';

import { AlertModel, AlertTypes } from './alert.model';
import { AlertService } from './alert.service'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, AfterViewInit, OnDestroy {

  alert: AlertModel = null;
  subscription: Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef, 
    private alertService: AlertService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.subscription = this.alertService.get().subscribe(alert => { 
      this.alert = alert;
      this.changeDetectorRef.detectChanges(); 
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
