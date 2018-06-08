import {BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HomeComponent } from './home/home.component';
import {CinemaworldComponent } from './cinemaworld/cinemaworld.component';
import {FilmworldComponent } from './filmworld/filmworld.component';
import {NavigationComponent } from './navigation/navigation.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {BusinessrulesService} from "./services/businessrules.service";
import {DataService} from "./services/data.service";
import {TokenInterceptor} from "./services/tokeninterceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CinemaworldComponent,
    FilmworldComponent,
    NavigationComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cinemaworld', component: CinemaworldComponent },
      { path: 'filmworld', component: FilmworldComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [BusinessrulesService,DataService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule  {


}
