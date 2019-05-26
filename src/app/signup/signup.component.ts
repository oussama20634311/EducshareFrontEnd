import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { compareValidator } from '../directives/compare-validator.directive';
import { SignupService } from './service/signup.service';
import { User } from '../users/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  reactiveForm: any = FormGroup;
  public userFile: any = File;
  public isMessage: boolean = false;
  id: number;

  public imagePath;
  url: any;
  public message: string;
  public IfSelectFile: boolean = false;

  constructor(private signupService: SignupService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.reactiveForm = this.fb.group({
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
  }

  saveForm(submitForm: FormGroup) {
    if (submitForm.valid) {
      console.log(submitForm.value);
      const user = submitForm.value;

      if (this.selectedRoleUser === 'étudiant') {
        if (this.IfSelectFile === false) {
          this.signupService.SaveProfileSansAvaterStudent(user)
            .subscribe(
              data => {
                console.log(data);
                this.router.navigate(['/']);
              }
            );
        } else {
          const formatDate: FormData = new FormData();
          formatDate.append('user', JSON.stringify(user));
          formatDate.append('file', this.userFile);
          console.log('formatDate =', formatDate);
          this.signupService.SaveProfileWithAvaterStudent(formatDate)
            .subscribe(
              data => {
                console.log(data);
                this.router.navigate(['/']);
              }
            );
        }
     
      }
      if(this.selectedRoleUser=="Enseignant"){
        if (this.IfSelectFile == false) {
          this.signupService.SaveProfileSansAvaterTeacher(user)
            .subscribe(
              data => {
                console.log(data);
                this.router.navigate(['/']);
              }
            );
        } else {
          const formatDate: FormData = new FormData();
          formatDate.append('user', JSON.stringify(user));
          formatDate.append('file', this.userFile);
          console.log('formatDate  =' + JSON.stringify(user));
          this.signupService.SaverProfileWithAvaterTeacher(formatDate)
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

  onSelectFile(event) { // appelé à chaque changement d'entrée de fichier
    this.IfSelectFile = true;
    const file = event.target.files[0]; // touts les coordonnes sur un image
    console.log(file);
    this.userFile = file;

    if (file.length === 0) {
      return;
    }

    var mimeType = event.target.files[0].type; //retourn le type de fichier
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Seules les images sont prises en charge.';
      this.isMessage = true;
      return;
    }

    this.isMessage = false;
    if (event.target.files && file) {
      var reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(file); // lire le fichier sous forme d'URL de données
      reader.onload = (event) => { // appelé une fois que readAsDataURL est terminée
        this.url = reader.result; // ajouter la source à l'image
      }

    }
  }

  // tslint:disable-next-line:member-ordering
  selectedRoleUser = '';
  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedRoleUser = event.target.value;
    console.log("event.target.value " + this.selectedRoleUser);
  }

}