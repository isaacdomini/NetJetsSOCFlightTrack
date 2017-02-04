import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { NavbarComponent } from './navbar/navbar.component'

@NgModule({
  imports: [ BrowserModule, FormsModule,
  					RouterModule.forRoot([
  					{
  						path: 'home',
  						component: HomeComponent
  					},
  					{
  						path: 'login',
  						component: LoginComponent
  					},
  				]) 
  			],
  declarations: [ AppComponent, LoginComponent, NavbarComponent, HomeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
