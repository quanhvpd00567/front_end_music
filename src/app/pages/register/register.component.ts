import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserRegister } from 'src/app/models/user.register';
import { UserErrorModel } from 'src/app/models/errors/user.error.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private route: Router) { }

  email: string;
  password: string;
  password_confirm: string;
  phone: string;
  errors: UserErrorModel
  ngOnInit(): void {
  }

  onRegister() {
    let data = {
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm,
      phone: this.phone
    }
    this.userService.signUp(data).subscribe( (res: UserRegister) => {
      console.log(res);
      
      if (res.status) {
        this.route.navigate(['register/confirm'])
      }else{
        this.errors = res.errors
      }
    })
  }

}
