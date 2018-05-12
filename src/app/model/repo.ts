import {Contributor} from "./Contributor";

export class Repo {
  constructor(
    public name: string = "",
    public uid: string = "",
    public contributor: Contributor = null) {}

}
