import {Component, Inject, OnInit} from '@angular/core';
import {BusinessrulesService} from "../services/businessrules.service";
import {IMovie} from "../models/movie.vm";
import {MovieRange} from "../models/movierange.vm";
import {MovieDetal} from "../models/moviedetail.vm";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movieCollection: MovieRange[] = [];
  movieDetail:MovieDetal;
  constructor(@Inject(BusinessrulesService) public busservice:BusinessrulesService)
  {

  }
  ngOnInit()
  {
    this.movieCollection= this.busservice.GetAllMovies()
  }
  GetLowestPrice(Id:string){
    this.movieDetail= this.busservice.GetPriceDetail(Id)
  }
}
