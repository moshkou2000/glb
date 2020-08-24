export class ScreenModel {
  smallMobile: boolean;
  mobile: boolean;
  tablet: boolean;
  laptop: boolean;
  desktop: boolean;
  largDesktop: boolean;

  constructor(flag: boolean) {
    this.smallMobile = flag;
    this.mobile = flag;
    this.tablet = flag;
    this.laptop = flag;
    this.desktop = flag;
    this.largDesktop = flag;
  }
}