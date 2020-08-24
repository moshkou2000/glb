export class ConfirmationModel {

    public title: string;
    public message: string;
    public button1: ConfirmationButtonModel;
    public button2: ConfirmationButtonModel;

    constructor(title: string, message: string) {
        this.title = title;
        this.message = message;
        // this.button1 = button1;
        // this.button2 = button2;
    }

}

export class ConfirmationButtonModel {
  
    public title: string = "";
    public click: any;
  
    constructor(title: string, click: any) {
        this.title = title;
        this.click = click;
    }
}