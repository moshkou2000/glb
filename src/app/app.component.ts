import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { fromEvent, Subscription, Observable } from 'rxjs';

import { ShowModel } from './models/show.model';
import { ScreenModel } from './models/screen.model';

import { GeneralService } from './services/general/general.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isMobile: boolean = false;
  isTablet: boolean = false;
  isFullscreen: boolean = false;

  show: ShowModel = new ShowModel(false);
  screen: ScreenModel = new ScreenModel(false);

  routerEventsSubscription: Subscription;
  layoutSubscription: Subscription;
  screenSizeSubscription: Subscription;

  screenSizeObservable: Observable<Event>;



  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private generalService: GeneralService,
    private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.screenSizeObservable = fromEvent(window, 'resize');

    this.screenSizeSubscription = this.screenSizeObservable.pipe(debounceTime(500)).subscribe(evt => {
      this.generalService.setScreenSize(this.setMediaSize());
      // this.generalService.toggleLeftSidenav(!this.isTablet, this.isTablet);
    });

    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isMobile = this.screen.mobile || this.screen.smallMobile;
        this.isTablet = this.isMobile || this.screen.tablet;

        if (this.activatedRoute.firstChild != null) {
          this.show.alert = this.activatedRoute.firstChild.snapshot.data.showAlert !== false;
          this.show.header = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
          this.show.sidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
          this.show.footer = this.activatedRoute.firstChild.snapshot.data.showFooter !== false && !this.isMobile;
        }

        this.generalService.toggleLeftSidenav(!this.isTablet, this.isTablet);
        this.generalService.setScreenSize(this.setMediaSize());
      }
    });

    this.layoutSubscription = this.generalService.getAppLayout().subscribe(show => {
      this.isMobile = this.screen.mobile || this.screen.smallMobile;
      this.isTablet = this.isMobile || this.screen.tablet;
      this.isFullscreen = show.data && show.data.fullscreen;

      this.show.alert = show.alert != null ? show.alert : this.show.alert;
      this.show.back = show.back != null ? show.back : this.show.back;
      this.show.title = show.title != null ? show.title : this.show.title;
      this.show.data = show.data != null ? show.data : this.show.data;
      this.show.header = show.header != null ? show.header : this.show.header;
      this.show.sidebar = show.sidebar != null ? show.sidebar : this.show.sidebar;
      this.show.footer = show.footer != null ? show.footer : this.show.footer;

      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) 
      this.routerEventsSubscription.unsubscribe();
    if (this.layoutSubscription) 
      this.layoutSubscription.unsubscribe();
    if (this.screenSizeSubscription) 
      this.screenSizeSubscription.unsubscribe();
  }

  updateLayout() {
    this.generalService.toggleLeftSidenav(!this.isTablet, this.isTablet);
  }

  onclickBack() {
    this.generalService.setBackButton();
  }

  setMediaSize() {
    // reset all
    this.screen = new ScreenModel(false);

    if (window.innerWidth < 440) {
      // Very small devices (small mobile, 440px and below)
      this.screen.smallMobile = true;

    } else if (window.innerWidth < 576) {
      // Small devices (mobile, 576px and below)
      this.screen.mobile = true;

    } else if (window.innerWidth < 768) {
      // Medium devices (tablets, 768px and below)
      this.screen.tablet = true;

    } else if (window.innerWidth < 992) {
      // Large devices (laptop, 992px and below)
      this.screen.laptop = true;

    } else if (window.innerWidth < 1200) {
      // large devices (desktops, 1200px and below)
      this.screen.desktop = true;
    } else if (window.innerWidth >= 1200) {
      // Extra large devices (larg desktops, 1200px and up)
      this.screen.largDesktop = true;
    }

    this.isMobile = this.screen.mobile || this.screen.smallMobile;
    this.isTablet = this.isMobile || this.screen.tablet;

    return this.screen;
  }

}
