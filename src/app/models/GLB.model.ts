export class GLBModel {
  duration: number = 5000; // ms
  currentTime: any = Date.now();
  
  model: any = null;
  hasRotation: boolean = true;
  animations: AnimationModel[] = [];
  animation: AnimationModel = null;

  constructor(model?: any) {
    this.model = model;
  }

  setAnimations = (animation: AnimationModel): void => {
    this.animation = animation;
    this.animations.push(animation);
  }

  infinitRotation = (): void => {
    if (this.hasRotation && this.model.model) {
      var now = Date.now();
      var deltat = now - this.currentTime;
      this.currentTime = now;
      var fract = deltat / this.duration;
      var angle = Math.PI * 2 * fract;

      this.model.model.rotation.y += angle;
      // model.model.rotation.x = Math.PI * -.5;
    }
  }

}

export class AnimationModel {
  isPaused: boolean = false;
  action: any = null;

  constructor(action?: any) {
    this.action = action;
  }
}