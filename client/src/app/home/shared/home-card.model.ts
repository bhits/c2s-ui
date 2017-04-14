
import {HomeCardState} from "./home-card-state.enum";
export class HomeCard {
  private routeUrl:string;
  private imageUrl:string;
  private title:string;
  private step:string;
  private description:string;
  private count:number;
  private headerClass:string;
  private state:HomeCardState;

  constructor(routeUrl:string, imageUrl:string,
              title:string, step:string, description:string){
    this.routeUrl = routeUrl;
    this.imageUrl = imageUrl;
    this.title = title;
    this.step = step;
    this.description = description;
    this.state = HomeCardState.INITIAL;
  }
}


