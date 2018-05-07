export class User {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public mail: string = '',
    public pass: string = '',
    public token: string = '',
    public logRequired: boolean = true
  ) {}
}
