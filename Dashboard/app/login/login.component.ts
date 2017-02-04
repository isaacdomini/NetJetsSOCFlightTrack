import { Component } from '@angular/core';

import { User } from './user';

@Component({
  selector: 'login',
  templateUrl: 'app/login/login.component.html'
})

export class LoginComponent {
	onSubmit(){
		console.log("submitted");
	}
}