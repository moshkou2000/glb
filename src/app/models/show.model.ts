export class ShowModel {

    alert: boolean;
    header: boolean;
    sidebar: boolean;
    footer: boolean;
    back: boolean;
    title: string;
    data: any;

    constructor(flag: boolean) {
      this.alert = flag;
      this.header = flag;
      this.sidebar = flag;
      this.footer = flag;
      this.back = flag;
      this.title = "";
      this.data = null;
    }
  }
  