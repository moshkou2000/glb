import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { fromEvent, Subscription, Observable } from 'rxjs';

import { ShowModel } from './models/show.model';
import { ScreenModel } from './models/screen.model';

import { GeneralService } from './services/general/general.service';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GLTFLoader from 'three-gltf-loader';

import { Vector } from 'three';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GLBModel, AnimationModel } from './models/GLB.model';

const mixers = [];
const clock = new THREE.Clock();


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // these need to be accessed inside more than one so we'll declare them first
  container: any;
  camera: any;
  controls: any;
  renderer: any;
  scene: any;
  models: GLBModel[] = [];
  selectedModel: GLBModel = new GLBModel();
  // duration: number = 5000; // ms
  // currentTime: any = Date.now();

  screenSizeSubscription: Subscription;



  isMobile: boolean = false;
  isTablet: boolean = false;
  isFullscreen: boolean = false;

  show: ShowModel = new ShowModel(false);
  screen: ScreenModel = new ScreenModel(false);

  routerEventsSubscription: Subscription;
  layoutSubscription: Subscription;

  screenSizeObservable: Observable<Event>;



  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private generalService: GeneralService,
    private changeDetectorRef: ChangeDetectorRef) {
    
    }

  ngOnInit() {
    this.screenSizeObservable = fromEvent(window, 'resize');

    this.screenSizeSubscription = this.generalService.getScreenSize().subscribe(size => {
      this.onWindowResize();
    });

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

    this.init();
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) 
      this.routerEventsSubscription.unsubscribe();
    if (this.layoutSubscription) 
      this.layoutSubscription.unsubscribe();
    if (this.screenSizeSubscription) 
      this.screenSizeSubscription.unsubscribe();
  }


  setMediaSize = (): ScreenModel => {
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

  init = (): void => {
    this.container = document.querySelector('#scene-container');

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x8FBCD4);

    this.createCamera();
    this.createControls();
    this.createLights();
    this.loadModels();
    this.createRenderer();

    this.renderer.setAnimationLoop(() => {
      this.update();
      this.render();
      this.models.forEach((model: GLBModel) => {
        model.infinitRotation();
      });
    });
  }


  createCamera = (): void => {
    this.camera = new THREE.PerspectiveCamera(100, this.container.clientWidth / this.container.clientHeight, 1, 1000);
    this.camera.position.set( -1.5, 1.5, 6.5 );
  }

  createControls = (): void => {
    this.controls = new OrbitControls(this.camera, this.container);
    // this.controls.enabled = false;
    // How far you can orbit vertically, upper and lower limits.
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;
    // How far you can dolly in and out ( PerspectiveCamera only )
    this.controls.minDistance = 0;
    this.controls.maxDistance = Infinity;
    // this.controls.enableZoom = true; // Set to false to disable zooming
    // this.controls.zoomSpeed = 1.0;
    this.controls.enablePan = true; // Set to false to disable panning (ie vertical and horizontal translations)
    this.controls.enableDamping = true; // Set to false to disable damping (ie inertia)
    this.controls.dampingFactor = 0.25;
  }

  createLights = (): void => {
    const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 5);
    const mainLight = new THREE.DirectionalLight(0xffffff, 5);
    mainLight.position.set( 10, 10, 10 );
    this.scene.add(ambientLight, mainLight);
  }

  loadModels = (): void => {
    const loader = new GLTFLoader();

    // A reusable to set up the models. We're passing in a position parameter
    // so that they can be individually placed around the scene
    const onLoad = (gltf: any, position: Vector) => {
      const model = gltf.scene;
      model.position.copy(position);

      const aModel = new GLBModel(model);

      if (gltf.animations.length > 0) {
        const mixer: any = new THREE.AnimationMixer(model);
        mixers.push(mixer);

        gltf.animations.forEach((animation: any) => {
          if (animation != null) {
            if (model) {
              const action = mixer.clipAction(animation);
              aModel.setAnimations(new AnimationModel(action));
              action.play();
            }
          }
        });
      }

      this.scene.add(model);
      this.models.push(aModel);

      console.log(this.models);
    };


    // the loader will report the loading progress to this function
    const onProgress = () => { };

    // the loader will send any error messages to this function, and we'll log
    // them to to console
    const onError = (errorMessage: any) => {
      console.log("::ERROR", errorMessage);
    };

    // load the first model. Each model is loaded asynchronously,
    // so don't make any assumption about which one will finish loading first
    const parrotPosition = new THREE.Vector3(10, 110, 110);
    loader.load('/assets/files/Parrot.glb', gltf => onLoad(gltf, parrotPosition), onProgress, onError);

    const flamingoPosition = new THREE.Vector3( 0, 0, 0 );
    loader.load( '/assets/files/Flamingo.glb', gltf => onLoad( gltf, flamingoPosition ), onProgress, onError );

    const storkPosition = new THREE.Vector3( -110, -110, -10 );
    loader.load( '/assets/files/Stork.glb', gltf => onLoad( gltf, storkPosition ), onProgress, onError );
  }

  createRenderer = (): void => {
    // create a WebGLRenderer and set its width and height
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.gammaFactor = 2.2;
    // this.renderer.gammaOutput = true;
    this.renderer.outputEncoding = true;
    this.renderer.physicallyCorrectLights = true;

    this.container.appendChild(this.renderer.domElement);
  }

  // infinitRotation = (model: GLBModel): void => {
  //   const m: GLBModel = model;
  //   if (m.hasRotation) {
  //     var now = Date.now();
  //     var deltat = now - this.currentTime;
  //     this.currentTime = now;
  //     var fract = deltat / this.duration;
  //     var angle = Math.PI * 2 * fract;
  
  //     m.model.rotation.y += angle;
  //     // model.model.rotation.x = Math.PI * -.5;
  //   }
  // }

  update = (): void => {
    const delta = clock.getDelta();
    for (const mixer of mixers) {
      mixer.update(delta);
    }
  }

  render = (): void => {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize = (): void => {
    if (this.container != null) {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
  
      // update the camera's frustum
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
  }

  onclickRotation = (): void => {
    this.selectedModel.hasRotation = !this.selectedModel.hasRotation;
  }

  onclickAction = (): void => {
    this.selectedModel.animation.isPaused = !this.selectedModel.animation.isPaused;
    this.selectedModel.animation.action.paused = this.selectedModel.animation.isPaused;
  }

  onclickModel = (model: any): void => {
    console.log("::onclickModel", model);
    this.selectedModel = model;
  }

  onclickAnimation = (animation: AnimationModel): void => {
    console.log("::onclickAnimation", animation);
    this.selectedModel.animation = animation;
  }


}
