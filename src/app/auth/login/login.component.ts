import { Component, OnInit } from '@angular/core';
import { AuthService } from "@auth/auth.service";
import { Router } from "@angular/router";
import { SnackService } from "@common/snack.service";
import { AppService } from "@common/app.service";



export class Auth {
  constructor(public email: string, public password: string) {

  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    public auth: AuthService,
    public router: Router,
    private snackService: SnackService,
    public appService: AppService) { }

  ngOnInit() {
  }

  login(user) {
    this.appService.fireLoader();
    this.auth.emailAndPassword(user.email.value, user.password.value).subscribe((value) => {
      let response = value;
      this.appService.stopLoader();
      if (response) {
        this.router.navigate(['/shop']);
        this.appService.stopLoader();
      }

    }, error => {
      this.router.navigate(['/shop']).then(() => {
        this.appService.stopLoader();
      }).catch(err => {
        this.snackService.launch("Error: " + err.message, "LA ruta no existe", 5000);
        this.appService.stopLoader();
      });
    });
  }
}
