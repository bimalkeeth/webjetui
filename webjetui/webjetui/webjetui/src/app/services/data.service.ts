import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IMovie} from "../models/movie.vm";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx"
import * as Enumerable from "linq";
import {MovieDetal} from "../models/moviedetail.vm";

@Injectable()
export class DataService {

  constructor(@Inject(HttpClient) public http:HttpClient ) { }
  public options = {withCredentials:true};

  GetAllCinemaServiceData():Promise<IMovie[]>{
   let result:IMovie[] ;
   return new Promise((resolve, reject) => {
      this.http.get<IMovie>("http://webjetapitest.azurewebsites.net/api/cinemaworld/movies")
        .toPromise().then(res => {
          result=res["Movies"];resolve(result);
        }, msg => {
             reject(msg);
        });
    });
   }
  GetAllFilmWorlData():Promise<IMovie[]>{
    let result:IMovie[] ;
    return new Promise((resolve, reject) => {
      this.http.get<IMovie>("http://webjetapitest.azurewebsites.net/api/filmworld/movies")
        .toPromise().then(res => {
          result=res["Movies"];resolve(result);
        }, msg => {
          reject(msg);
        });
    });
  }
  GetCinemaMovieById(id:string):Promise<MovieDetal>{

    let result:MovieDetal ;
    return new Promise((resolve, reject) => {
      this.http.get<MovieDetal>("http://webjetapitest.azurewebsites.net/api/cinemaworld/movie/"+id)
        .toPromise().then(res => {
        result=res;
        resolve(result)
        }, msg => {
        reject(msg);
      });
    });
  }
  GetFilmMovieById(id:string):Promise<MovieDetal>{
    let result:MovieDetal ;
    return new Promise((resolve, reject) => {
      this.http.get<MovieDetal>("http://webjetapitest.azurewebsites.net/api/filmworld/movie/"+id)
        .toPromise().then(res => {
        result=res;
        resolve(result)
      }, msg => {
        reject(msg);
      });
    });
  }



}
