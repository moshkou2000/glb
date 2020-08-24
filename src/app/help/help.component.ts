import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { environment } from '../../environments/environment';

import { GeneralService } from '../services/general/general.service';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit, AfterViewInit, OnDestroy {

  isLock = false;

  currentAction = {
    index: 0,
    title: "Need help?",
    description: "Don't bother about asking questions multiple times."
  };

  screenSize = {
    subscription: null  // typeof: Subscription
  }

  cardClass = "card";
  
  // update value only at api callback
  static success = true;

  success() {
    return HelpComponent.success ? null : { failed: { valid: false } };
  }

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

  onclickHelpCenter() { }
  onclickUpdatePaymentMethod() { }
  onclickUpdatePassword() { }

  onclick() {
    !environment.production && console.log('onclick');
  }
  

}