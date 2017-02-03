import { Component } from '@angular/core';
import {User} from '../models/user';
@Component({
  selector: 'login',
  templateUrl: 'app/login/login.component.html'
})

export class LoginComponent {
  public user = new User('','');
  public errorMsg = '';
  login() {
    //if(!this._service.login(this.user)){
        this.errorMsg = this.user;
    //}
  }

}
