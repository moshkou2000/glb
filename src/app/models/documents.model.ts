export class DocumentsModel {

  public created: string;
  public state: string;
  public number: number;
  public title: string;
  

  constructor(created: string, state: string, number: number, title: string) {
      this.created = created;
      this.state = state;
      this.number = number;
      this.title = title;
  }
}
  