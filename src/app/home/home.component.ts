import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { fromEvent, Subscription, Observable } from 'rxjs';

import { GeneralService } from '../services/general/general.service';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GLTFLoader from 'three-gltf-loader';

import { Vector } from 'three';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GLBModel, AnimationModel } from '../models/GLB.model';

const MIXERS = [];
const CLOCK = new THREE.Clock();
const TIME_OPTIONS: any = { hour: "2-digit", minute: "2-digit", second: "2-digit", milisecond: "2-digit", hour12: false };


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // these need to be accessed inside more than one so we'll declare them first
  container: any;
  camera: any;
  controls: any;
  renderer: any;
  scene: any;
  models: GLBModel[] = [];
  selectedModel: GLBModel = new GLBModel();
  rendererCounter: number = 0;
  // duration: number = 5000; // ms
  // currentTime: any = Date.now();

  routerEventsSubscription: Subscription;


  constructor(private router: Router) { 
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // TODO: on navigation end
      }
    });
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) 
      this.routerEventsSubscription.unsubscribe();
  }

  init = (): void => {
    this.container = document.querySelector('#scene-container');

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x002633);

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
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = -10;
    this.controls.screenSpacePanning = true;
    this.controls.enabled = true;
    // How far you can orbit vertically, upper and lower limits.
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;
    // How far you can dolly in and out ( PerspectiveCamera only )
    this.controls.minDistance = 0;
    this.controls.maxDistance = Infinity;
    this.controls.enableZoom = true; // Set to false to disable zooming
    this.controls.zoomSpeed = 1.0;
    this.controls.enablePan = true; // Set to false to disable panning (ie vertical and horizontal translations)
    this.controls.enableDamping = true; // Set to false to disable damping (ie inertia)
    this.controls.dampingFactor = 0.25;
  }

  createLights = (): void => {
		var color = new THREE.Color( 0xffffff );
    // const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 1);
    const mainLight = new THREE.DirectionalLight(color);
    mainLight.position.set( 0, 0, -1 );
    this.scene.add(mainLight);
  }

  loadModels = (): void => {
    const loader = new GLTFLoader();

    // A reusable to set up the models. We're passing in a position parameter
    // so that they can be individually placed around the scene
    const onLoad = (gltf: any, position: Vector) => {
      console.log("%c::LOADING " + new Date().toLocaleTimeString("en-us", TIME_OPTIONS), 'color: #00aaff;');

      const model = gltf.scene;
      model.position.copy(position);

      const aModel = new GLBModel(model);

      if (gltf.animations.length > 0) {
        const mixer: any = new THREE.AnimationMixer(model);
        MIXERS.push(mixer);

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

      console.info("::MODELS", new Date().toLocaleTimeString("en-us", TIME_OPTIONS), " ", this.models);
    };

    // the loader will report the loading progress to this function
    const onProgress = (progress: any) => {
      console.log("%c::PROGRESS " + Math.floor((progress.loaded / progress.total) * 100) + '%', 'color: #4cb50e;');
     };

    // the loader will send any error messages to this function, and we'll log
    // them to to console
    const onError = (errorMessage: any) => {
      console.error("%c::ERROR", 'color: #c90404;', errorMessage);
    };

    // load the first model. Each model is loaded asynchronously,
    // so don't make any assumption about which one will finish loading first

    // const parrotPosition = new THREE.Vector3(10, 110, 110);
    // loader.load('/assets/files/power_turbine.glb', gltf => onLoad(gltf, parrotPosition), onProgress, onError);
    
    // const parrotMultiplePosition = new THREE.Vector3(90, -90, 0);
    // loader.load('/assets/files/turbine_mid_frame.glb', gltf => onLoad(gltf, parrotMultiplePosition), onProgress, onError);

    // const flamingoPosition = new THREE.Vector3( 0, 0, 0 );
    // loader.load( '/assets/files/compressor_rear_frame.glb', gltf => onLoad( gltf, flamingoPosition ), onProgress, onError );

    const enginePosition = new THREE.Vector3( 0, 0, 0 );
    loader.load( '/assets/files/turbine__turbofan_engine/scene.gltf', gltf => onLoad( gltf, enginePosition ), onProgress, onError );
  }

  createRenderer = (): void => {
    // create a WebGLRenderer and set its width and height
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.gammaFactor = 2.2;
    this.renderer.gammaOutput = true;
    this.renderer.outputEncoding = true;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setClearColor( 0xcccccc );

    this.container.appendChild(this.renderer.domElement);
  }

  update = (): void => {
    const delta = CLOCK.getDelta();
    for (const mixer of MIXERS) {
      mixer.update(delta);
    }
  }

  render = (): void => {
    this.renderer.render(this.scene, this.camera);

    if (this.models.length === 0 || this.rendererCounter < 3) {
      if (this.models.length > 0)
        this.rendererCounter++;
      console.log("%c::RENDERER " + new Date().toLocaleTimeString("en-us", TIME_OPTIONS), 'color: #ecc804;');
    }
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
