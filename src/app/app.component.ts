import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { fromEvent, Subscription, Observable } from 'rxjs';

import { GeneralService } from './services/general/general.service';

// import { ShowModel } from './models/show.model';
// import { ScreenModel } from './models/screen.model';

// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import GLTFLoader from 'three-gltf-loader';

// import { Vector } from 'three';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { GLBModel, AnimationModel } from './models/GLB.model';

// const MIXERS = [];
// const CLOCK = new THREE.Clock();
// const TIME_OPTIONS: any = { hour: "2-digit", minute: "2-digit", second: "2-digit", milisecond: "2-digit", hour12: false };

enum PAGES {
  home = "home",
  about = "about", 
  products = "products", 
  gallery = "gallery",
  contact = "contact"
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // these need to be accessed inside more than one so we'll declare them first
  // container: any;
  // camera: any;
  // controls: any;
  // renderer: any;
  // scene: any;
  // models: GLBModel[] = [];
  // selectedModel: GLBModel = new GLBModel();
  // rendererCounter: number = 0;
  // duration: number = 5000; // ms
  // currentTime: any = Date.now();

  pages = PAGES;
  page: string = PAGES.home;

  // isMobile: boolean = false;
  // isTablet: boolean = false;
  // isFullscreen: boolean = false;

  // show: ShowModel = new ShowModel(false);
  // screen: ScreenModel = new ScreenModel(false);

  routerEventsSubscription: Subscription;
  // layoutSubscription: Subscription;

  screenSizeSubscription: Subscription;
  screenSizeObservable: Observable<Event>;



  constructor(private generalService: GeneralService,
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private changeDetectorRef: ChangeDetectorRef) {
    
    }

  ngOnInit() {
    this.screenSizeObservable = fromEvent(window, 'resize');

    // this.screenSizeSubscription = this.generalService.getScreenSize().subscribe(size => {
    //   this.onWindowResize();
    // });

    this.screenSizeSubscription = this.screenSizeObservable.pipe(debounceTime(500)).subscribe(evt => {
      this.generalService.setScreenSize(null);
      // this.generalService.setScreenSize(this.setMediaSize());
      // this.generalService.toggleLeftSidenav(!this.isTablet, this.isTablet);
    });

    // this.routerEventsSubscription = this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {

    //     this.isMobile = this.screen.mobile || this.screen.smallMobile;
    //     this.isTablet = this.isMobile || this.screen.tablet;

    //     if (this.activatedRoute.firstChild != null) {
    //       this.show.alert = this.activatedRoute.firstChild.snapshot.data.showAlert !== false;
    //       this.show.header = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
    //       this.show.sidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
    //       this.show.footer = this.activatedRoute.firstChild.snapshot.data.showFooter !== false && !this.isMobile;
    //     }

    //     this.generalService.toggleLeftSidenav(!this.isTablet, this.isTablet);
    //     this.generalService.setScreenSize(this.setMediaSize());
    //   }
    // });
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) 
      this.routerEventsSubscription.unsubscribe();
    if (this.screenSizeSubscription) 
      this.screenSizeSubscription.unsubscribe();
    // if (this.layoutSubscription) 
    //   this.layoutSubscription.unsubscribe();
  }


  // setMediaSize = (): ScreenModel => {
  //   // reset all
  //   this.screen = new ScreenModel(false);

  //   if (window.innerWidth < 440) {
  //     // Very small devices (small mobile, 440px and below)
  //     this.screen.smallMobile = true;

  //   } else if (window.innerWidth < 576) {
  //     // Small devices (mobile, 576px and below)
  //     this.screen.mobile = true;

  //   } else if (window.innerWidth < 768) {
  //     // Medium devices (tablets, 768px and below)
  //     this.screen.tablet = true;

  //   } else if (window.innerWidth < 992) {
  //     // Large devices (laptop, 992px and below)
  //     this.screen.laptop = true;

  //   } else if (window.innerWidth < 1200) {
  //     // large devices (desktops, 1200px and below)
  //     this.screen.desktop = true;
  //   } else if (window.innerWidth >= 1200) {
  //     // Extra large devices (larg desktops, 1200px and up)
  //     this.screen.largDesktop = true;
  //   }

  //   this.isMobile = this.screen.mobile || this.screen.smallMobile;
  //   this.isTablet = this.isMobile || this.screen.tablet;

  //   return this.screen;
  // }

  // onWindowResize = (): void => {
  //   if (this.container != null) {
  //     this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
  
  //     // update the camera's frustum
  //     this.camera.updateProjectionMatrix();
  //     this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  //   }
  // }

}