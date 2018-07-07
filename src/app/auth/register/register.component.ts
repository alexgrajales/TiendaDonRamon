import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth/auth.service";
import {AngularFirestore} from "angularfire2/firestore";
import {SnackService} from "@common/snack.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AppService} from "@common/app.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public snackService: SnackService,
    public afs: AngularFirestore,
    private title: Title,
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.title.setTitle('Registro en la tienda');
  }

  signUp(user) {
    this.appService.fireLoader();

    this.auth.signUp(user.email.value, user.password.value).subscribe((value) => {
      const userJson = value;
      this.snackService.launch('Registro correcto, iniciando sesión', 'Alta usuario', 5000);

      const data = {
        uid: userJson.uid,
        email: user.email.value,
        displayName: user.email.value,
        photoUrl: null,
        role: 'customer'
      };

      this.auth.emailAndPassword(data.email, user.password.value).subscribe((value) => {
        let response = value;
        this.appService.stopLoader();
        if (response)
          this.router.navigate(['/shop']);
      }, error => { this.appService.stopLoader(); });      
    }, error => { this.appService.stopLoader(); });	
    
    	
    
  }
}
