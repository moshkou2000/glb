import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { environment } from '../../environments/environment';

import { GeneralService } from '../services/general/general.service';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  currentAction = {
    code: 404,
    title: "Page not found!!!",
    description: "Basically, this is a page that doesn't exist or broken."
  };

  screenSize = {
    subscription: null  // typeof: Subscription
  }

  cardClass = "card";
  

  constructor(
    private generalService: GeneralService, 
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.updateLayout(this.generalService.getMediaSize());
    this.screenSize.subscription = this.generalService.getScreenSize().subscribe(size => {
      this.updateLayout(size);
    });
  }

  ngOnDestroy() {
    if (this.screenSize.subscription) {
      this.screenSize.subscription.unsubscribe();
    }
  }

  
  updateLayout(size) {
    this.cardClass = size.smallMobile || size.mobile ? "card card-page" : "card";
    this.changeDetectorRef.detectChanges(); 
  }

}