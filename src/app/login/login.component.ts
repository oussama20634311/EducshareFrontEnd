import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  connected = false;
  mode = 0;
  constructor( private router: Router , private authenticationService: AuthenticationService) { }

  ngOnInit() {

  }
  
  onLogin(user) {
   // window.location.reload();
    this.authenticationService.login(user.email , user.password).subscribe(
      response => {
        if (response != null) {
          localStorage.setItem('email', user.email);
          console.log('This is my response', response);
          this.connected = false;
        } else {
          this.connected = true;
          this.mode = 1;
        }
      });
      if ( this.connected === false) {
        this.authenticationService.getUserByEmail(user.email).subscribe(
          response => {
            console.log('data', response );
             if ( response.userRole === 'Enseignant') {
                 this.router.navigate(['documents']);
             } else {
              this.router.navigate(['/']);
             }
          }
        );
      }
     
 }
}
