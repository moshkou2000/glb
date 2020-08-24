import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { merge, Observable, of as observableOf, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { GeneralService } from '../../services/general/general.service';

import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() showSidebar: boolean;
  @Input() isTablet: boolean;
  @Input() isMobile: boolean;

  breadcrumbs: any = null;

  isLock: boolean = false;

  routerEventsSubscription: Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient,
    private generalService: GeneralService,
    private snackbar: MatSnackBar,
    private location: Location,
    private router: Router) {

    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = this.generalService.getBreadcrumbs(this.location.path());
        if (!this.breadcrumbs)
          this.breadcrumbs = { link: '', label: '', parents: null };
      }
    });

  }
  
  ngOnInit() {
    this.breadcrumbs = this.generalService.getBreadcrumbs(this.location.path());
    if (!this.breadcrumbs) 
    this.breadcrumbs = { link: '', label: '', parents: null };
  }

  ngOnDestroy() {
  }

 
  /*
    openSnackBar: 
  */

  openSnackBar(message: string, action: string, color: string): void {
    this.snackbar.open(message, action, {
      duration: 2000,
      panelClass: [color]
    });
  }

  detectChanges(): void {
    setTimeout(() => {
      if (this.changeDetectorRef !== null && this.changeDetectorRef !== undefined &&
        !(this.changeDetectorRef as ViewRef).destroyed) {
        this.changeDetectorRef.detectChanges();
      }
    }, 250);
  }

}
