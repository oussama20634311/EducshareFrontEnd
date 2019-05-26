import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { UserProfilService } from '../users/service/user-profil.service';
import { User } from '../users/user';
import { FormBuilder } from '@angular/forms';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private email = null;
  userProfil: User = null;
  base64Data: string;
  converted_image: string;
  public displayImage = false;
  public url: any = '/assets/images/user_avatar.png';
  user_roleEtudiant : boolean;
  user_roleEnseignant : boolean;
  constructor(
    public authenticationService: AuthenticationService,
    private userProfilService: UserProfilService,
    private fb: FormBuilder) { }

    loadEmail() {
      this.email = localStorage.getItem('email');
    }

  ngOnInit() {
    if (this.email === null) { this.loadEmail(); }
    this.userProfilService.getEmail(localStorage.getItem('email'))
      .subscribe(userProfil => {
       this.user_roleEtudiant = this.authenticationService.isEtudiant(userProfil.userRole);
        this.user_roleEnseignant = this.authenticationService.isEnseignant(userProfil.userRole);
        this.userProfil = userProfil;
       this.base64Data = this.userProfil.avatar;
       this.converted_image = 'data:image/jpeg;base64,' + this.base64Data;
       if (this.base64Data == null) {
         this.displayImage = false;
       } else {
         this.displayImage = true;
       }
      });
  }
}
