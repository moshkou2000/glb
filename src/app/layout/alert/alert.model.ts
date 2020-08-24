export class AlertModel {

  public _id: string;
  public type: number = 0;
  public message: string;
  public options: [Options];

  constructor(_id, type, message, options) {
    this._id = _id;
    this.type = type;
    this.message = message;
    this.options = options;
  }

  getType() {
    return Object.values(AlertTypes)[this.type];
  }

}

export class Options {
  public alert_id: string = "";
  public text: string;
  public value: any;
}

/*
  get alert type =>
    Object.values(AlertTypes)[alert.type]
*/
export const AlertTypes = {
  default: "default",   //  0
  error: "error",       //  1
  info: "info",         //  2
  success: "success",   //  3
  warning: "warning"    //  4
};
