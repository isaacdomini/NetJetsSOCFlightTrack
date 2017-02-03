import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {LoginComponent } from './login/login.component'
import {NavbarComponent } from './navbar/navbar.component'

import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, LoginComponent, NavbarComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }