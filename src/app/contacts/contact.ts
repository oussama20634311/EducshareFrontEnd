export class Message {

  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public content: string,
    public telNumber: string,
    public createdAt: Date,
    public updatedAt: Date
  ) { }
}
