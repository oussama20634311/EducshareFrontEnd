import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { compareValidator } from 'src/app/directives/compare-validator.directive';
import { UserProfilService } from '../service/user-profil.service';
import { User } from '../user';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {

  userForm: FormGroup;
  public userFile: File;
  public isMessage: boolean = false;
  userProfil: User = null;
  private email = null;
  public imagePath;
  public url: any = '/assets/images/user_avatar.png';
  public message: string;
  base64Data: string;
  converted_image: string;
  public displayImage = false;
  OnClickBtnImage = false;

  constructor(
    private userProfilService: UserProfilService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: new FormControl('', [Validators.required,
      Validators.compose([Validators.pattern('[a-zA-z ]*'), Validators.minLength(3)])]),
      lastName: new FormControl('', [Validators.required,
      Validators.compose([Validators.pattern('[a-zA-z ]*'), Validators.minLength(2)])]),
      email: new FormControl('', [Validators.required,
      Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]),
      telNumber: new FormControl('', [Validators.required,
      Validators.compose([Validators.pattern('[0-9+ ]*'), Validators.minLength(8), Validators.maxLength(12)])]),
      cin: new FormControl(),
      city: new FormControl(),
      birthDate: new FormControl(),
      avatar: new FormControl(),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [Validators.required, compareValidator('password')]),
      userUniversity: new FormControl(),
      userSection: new FormControl,
      userLevel: new FormControl,
      userClass: new FormControl,
      userCountry: new FormControl
    });

    if (this.email === null) { this.loadEmail(); }
    this.userProfilService.getEmail(this.email)
      .subscribe(userProfil => {
        this.userProfil = userProfil;
        console.log('userProfil', this.userProfil);
        this.userForm.get('firstName').setValue(this.userProfil.firstName);
        this.userForm.get('lastName').setValue(this.userProfil.lastName);
        this.userForm.get('email').setValue(this.userProfil.email);
        this.userForm.get('telNumber').setValue(this.userProfil.telNumber);
        this.userForm.get('cin').setValue(this.userProfil.cin);
        this.userForm.get('city').setValue(this.userProfil.city);
        this.userForm.get('birthDate').setValue(this.userProfil.birthDate);
        this.userForm.get('userUniversity').setValue(this.userProfil.userCountry);
        this.userForm.get('userSection').setValue(this.userProfil.userSection);
        this.userForm.get('userCountry').setValue(this.userProfil.userUniversity);
        this.userForm.get('userLevel').setValue(this.userProfil.userLevel);
        this.userForm.get('userClass').setValue(this.userProfil.userClass);

        this.base64Data = this.userProfil.avatar;
        this.converted_image = 'data:image/jpeg;base64,' + this.base64Data;
        console.log('converted image ', this.converted_image);
        if (this.base64Data == null) {
          this.displayImage = false;
        } else {
          this.displayImage = true;
        }
      });

  }

  loadEmail() {
    this.email = localStorage.getItem('email');
  }

  onSelectFile(event) { // appelé à chaque changement d'entrée de fichier
    const file = event.target.files[0]; // touts les coordonnes sur une image
    console.log(file);
    this.userFile = file;
    if (file.length === 0) {
      return;
    }
    const mimeType = event.target.files[0].type; //retourn le type de fichier
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Seules les images sont prises en charge.';
      this.isMessage = true;
      return;
    }

    this.isMessage = false;
    if (event.target.files && file) {
      const reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(file); // lire le fichier sous forme d'URL de données
      reader.onload = (event) => { // appelé une fois que readAsDataURL est terminée
        this.url = reader.result; // ajouter la source à l'image
      };
    }
    this.displayImage = false;
    this.OnClickBtnImage = true;
  }

  updateForm(submitForm: FormGroup) {
    if (submitForm.valid) {
      const user = submitForm.value;
      const formatDate: FormData = new FormData();
      formatDate.append('user', JSON.stringify(user));
      formatDate.append('file', this.userFile);
      if (this.OnClickBtnImage === false) {
        this.userProfilService.updateProfileWithoutAvatar(user)
          .subscribe(
            data => {
              console.log(data);
              this.router.navigate(['/']);
            }
          );
      } else {
        this.userProfilService.updateProfileWithAvatar(formatDate)
          .subscribe(
            data => {
              console.log(data);
              this.router.navigate(['/']);
            }
          );
      }
    }
  }
}
