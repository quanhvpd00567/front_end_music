import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  email: string = 'quanhv1@gmail.com'
  password: string = '10061994'
  returnUrl: string = '';
  constructor(
    private authenService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  ngOnInit(): void {
  }

  public onLogin() {

    this.authenService.login(this.email, this.password).pipe(first()).subscribe(data => {
      this.router.navigate([this.returnUrl])
    })
  }

}
