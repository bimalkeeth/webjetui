import {Inject, Injectable} from '@angular/core';
import {DataService} from "./data.service";
import {IMovie} from "../models/movie.vm";
import {Observable} from "rxjs/Observable";
import * as Enumerable from "linq";
import {DomSanitizerImpl} from "@angular/platform-browser/src/security/dom_sanitization_service";
import {MovieRange} from "../models/movierange.vm";
import {MovieDetal} from "../models/moviedetail.vm";
@Injectable()
export class BusinessrulesService {

  constructor(@Inject(DataService) public dataservice:DataService)
  {

  }
  GetAllMovies():MovieRange[]{
    let cinemaDataList:IMovie[]=[];let filmDataList:IMovie[] = [];let resultList :IMovie[] = [];
    let movierangeList:MovieRange[]=[];
    this.dataservice.GetAllCinemaServiceData().then(s=>{
      s.forEach(x=>{
         cinemaDataList.push(x)
      });
      this.dataservice.GetAllFilmWorlData().then(s=>{
        s.forEach(x=>{

          filmDataList.push(x)
        });
        cinemaDataList.forEach(item=>{

          item.ID=item.ID.substr(2);
          resultList.push(item);
          let itemExits=Enumerable.from(filmDataList)
            .where((d:IMovie)=>{return  d.ID.substr(2)==item.ID})
            .select(elem =>  elem).firstOrDefault();

          if(itemExits){
            filmDataList=Enumerable.from(filmDataList)
              .where((d:IMovie)=>{return  d.ID.substr(2)!=item.ID})
              .select(elem =>  elem).toArray()
          }
        });
        filmDataList.map(d=>{
          d.ID=d.ID.substr(2);

          resultList.push(d)
        });
        let counter=0;
        for (let i=0;i<=resultList.length;i++) {

          let tailCount=counter==0?5: counter+5;
          let cinemadata:IMovie[]=[];
          for (let j =counter;j<tailCount;j++) {
            cinemadata.push(resultList[j])
          }
          counter = tailCount+1;
          movierangeList.push({Movies:cinemadata})
        }
        return movierangeList
      }).catch((error:any) =>{return Observable.of( error)});;

    }).catch((error:any) =>{return Observable.of( error)});
    return movierangeList
  }

  GetPriceDetail(id :string):MovieDetal{
       let cinema:MovieDetal;
       let film:MovieDetal;
       this.dataservice.GetCinemaMovieById("cw"+id).then(t=>{
         cinema=t;
         this.dataservice.GetFilmMovieById("fw"+id).then(f=>{
           film=f;
         });
         if (Number(cinema.Price)<Number(film.Price) ) {
           return cinema
         }
         else {
           return film
         }
       });
       return null;
  }
}



