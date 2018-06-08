import {SafeStyle} from "@angular/platform-browser";

export interface IMovie {
  ID:string;
  Title:string;
  Year:number;
  Type:string;
  Poster:string;
  Img:SafeStyle;
}
