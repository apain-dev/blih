import {Contributor} from "./Contributor";

export class Repo {
  constructor(
    public _name: string = "",
    public uid: string = "",
    public contributor: Contributor = null) {}

  public get name(): string {
    return this._name;
  }
}
