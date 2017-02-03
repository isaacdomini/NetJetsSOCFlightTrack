import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {Component} from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent }  from './app.component';
import {LoginComponent } from './login/login.component'

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, LoginComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
