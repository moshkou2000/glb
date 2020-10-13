import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { fromEvent, Subscription, Observable } from 'rxjs';

import {
  Vector,
  Vector3,
  sRGBEncoding,
  LinearEncoding,
  PMREMGenerator,
  Scene,
  Color,
  Clock,
  AmbientLight,
  WebGLRenderer,
  AnimationMixer,
  UnsignedByteType,
  PerspectiveCamera,
  DirectionalLight
} from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GLTFLoader from 'three-gltf-loader';
import createBackground from 'three-vignette-background';
//npm install @types/three-vignette-background


import { GeneralService, ENVIRONMENTS, TIME_OPTIONS, IS_IOS } from '../services/general/general.service';

import { GLBModel, AnimationModel } from '../models/GLB.model';

const MIXERS = [];
const CLOCK = new Clock();
const DEFAULT_CAMERA = '[default]';


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
  scene: Scene;
  pmremGenerator: PMREMGenerator;
  vignette: any;

  state: any = {
    environment: 'venice-sunset', // 'footprint-court' OR null
    background: false,
    playbackSpeed: 1.0,
    actionStates: {},
    camera: DEFAULT_CAMERA,
    wireframe: false,
    skeleton: false,
    grid: false,

    // Lights
    addLights: true,
    exposure: 1.0,
    textureEncoding: 'sRGB',
    ambientIntensity: 0.3,
    ambientColor: 0xFFFFFF,
    directIntensity: 0.8 * Math.PI, // TODO(#116)
    directColor: 0xFFFFFF,
    bgColor1: '#ffffff',
    bgColor2: '#353535'
  };

  models: GLBModel[] = [];
  selectedModel: GLBModel = new GLBModel();
  rendererCounter: number = 0;

  // duration: number = 5000; // ms
  // currentTime: any = Date.now();

  routerEventsSubscription: Subscription;
  screenSizeSubscription: Subscription;


  constructor(private router: Router,
    private generalService: GeneralService) { 
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // TODO: on navigation end
      }
    });

    this.screenSizeSubscription = this.generalService.getScreenSize().subscribe(size => {
      this.onWindowResize();
    });
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription)
      this.routerEventsSubscription.unsubscribe();
    if (this.screenSizeSubscription)
      this.screenSizeSubscription.unsubscribe();
  }

  init = (): void => {
    this.container = document.querySelector('#scene-container');
    this.models.forEach((model: any) => this.scene.remove(model));

    this.scene = new Scene();
    this.scene.background = new Color(0x002633);

    this.createCamera();
    this.createControls();
    this.createLights();
    this.loadModels();
    this.updateEnvironment();
    this.createRenderer();
  }

  createCamera = (): void => {
    //0.8 * 180 / Math.PI
    const size = 10;
    const center = new Vector3(0, 0, 0);

    this.camera = new PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 0.01, 1000);
    // this.camera.near = size / 100;
    // this.camera.far = size * 100;
    this.camera.updateProjectionMatrix();
    this.camera.position.copy(center);
    // this.camera.position.x += size / 2.0;
    // this.camera.position.y += size / 5.0;
    // this.camera.position.z += size / 2.0;
    this.camera.lookAt(center);
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
		var color = new Color( 0xffffff );
    // // const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 1);
    // const ambientLight = new AmbientLight(this.state.ambientColor, this.state.ambientIntensity);
    // // ambientLight.position.set( 0, 0, -1 );
    // this.camera.add(ambientLight);

    const mainLight = new DirectionalLight(color);
    // mainLight.position.set( 0, 0, -1 );
    this.scene.add(mainLight);

    const light1 = new AmbientLight(this.state.ambientColor, this.state.ambientIntensity);
    light1.name = 'ambient_light';
    this.camera.add(light1);

    const light2 = new DirectionalLight(this.state.directColor, this.state.directIntensity);
    light2.position.set(0.5, 0, 0.866); // ~60º
    light2.name = 'main_light';
    this.camera.add(light2);
  }

  updateEnvironment = (): void => {
    this.vignette = createBackground({
      aspect: this.camera.aspect,
      grainScale: IS_IOS ? 0 : 0.001, // mattdesl/three-vignette-background#1
      colors: [this.state.bgColor1, this.state.bgColor2]
    });
    this.vignette.name = 'Vignette';
    this.vignette.renderOrder = -1;

    const environment = ENVIRONMENTS.filter((entry) => entry.id === this.state.environment)[0];
    
    this.getCubeMapTexture( environment ).then(( { envMap } ) => {
      this.scene.add(this.vignette);
      this.scene.environment = envMap;
      this.scene.background = this.state.background ? envMap : null;
    });
  }

  getCubeMapTexture = (environment: any): Promise<any> => {
    const { path } = environment;

    // no envmap
    if ( ! path ) return Promise.resolve( { envMap: null } );
    return new Promise( ( resolve, reject ) => {
      new RGBELoader()
        .setDataType( UnsignedByteType )
        .load( path, ( texture ) => {
          const envMap = this.pmremGenerator.fromEquirectangular( texture ).texture;
          this.pmremGenerator.dispose();
          resolve( { envMap } );
        }, undefined, reject );
    });
  }

  // updateTextureEncoding () {
  //   const encoding = this.state.textureEncoding === 'sRGB'
  //     ? sRGBEncoding
  //     : LinearEncoding;
  //   traverseMaterials(this.content, (material) => {
  //     if (material.map) material.map.encoding = encoding;
  //     if (material.emissiveMap) material.emissiveMap.encoding = encoding;
  //     if (material.map || material.emissiveMap) material.needsUpdate = true;
  //   });
  // }

  loadModels = (): void => {
    const loader = new GLTFLoader();

    // A reusable to set up the models. We're passing in a position parameter
    // so that they can be individually placed around the scene
    const onLoad = (gltf: any) => {
      console.log("%c::LOADING " + new Date().toLocaleTimeString("en-us", TIME_OPTIONS), 'color: #00aaff;');

      const model = gltf.scene;
      const aModel = new GLBModel(model);

      if (gltf.animations.length > 0) {
        const mixer: any = new AnimationMixer(model);
        MIXERS.push(mixer);

        gltf.animations.forEach((animation: any) => {
          if (animation != null) {
            if (model) {
              const action = mixer.clipAction(animation);
              aModel.setAnimations(new AnimationModel(action));
              action.reset().play();
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

    loader.load( '/assets/files/models/compressor_rear_frame.glb', gltf => onLoad(gltf), onProgress, onError );
    loader.load( '/assets/files/models/turbine_mid_frame.glb', gltf => onLoad(gltf), onProgress, onError );
    loader.load( '/assets/files/models/turbine_rear_frame.glb', gltf => onLoad(gltf), onProgress, onError );
    loader.load( '/assets/files/models/power_turbine.glb', gltf => onLoad(gltf), onProgress, onError );
    // loader.load( '/assets/files/models/engine.glb', gltf => onLoad(gltf), onProgress, onError );
    // loader.load( '/assets/files/turbine__turbofan_engine/scene.gltf', gltf => onLoad(gltf), onProgress, onError );
  }

  createRenderer = (): void => {
    // create a WebGLRenderer and set its width and height
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.gammaFactor = 2.2;
    this.renderer.gammaOutput = true;
    this.renderer.outputEncoding = true;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setClearColor(0xcccccc);

    this.pmremGenerator = new PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();

    this.container.appendChild(this.renderer.domElement);

    this.renderer.setAnimationLoop(() => {
      this.update();
      this.render();
      this.models.forEach((model: GLBModel) => {
        model.infinitRotation();
      });
    });
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

  /*
    Actions
    onWindowResize: re render
    onclickRotation
    onclickAction
    onclickModel
    onclickAnimation
  */

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
