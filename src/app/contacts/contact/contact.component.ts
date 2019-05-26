import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../service/contact.service';
// decorateur
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  // un form reactif est de type FormGroup et il groupe plaisieurs FormControl
  // FormBuilder est une classe continue des methodes pour crée d'objet FormGroup

  reactiveForm: FormGroup;
  // constructor = est une methode par defaut de la classe qui executée et initlisée les champs de configuration
  // et injection despendance
  constructor(
     private contactService: ContactService,
     private fb: FormBuilder,
     private router: Router) { }
  // ngOnInit est une cycle de vie appele par angular pour terminer la creation du composant
  ngOnInit() {
    this.reactiveForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.compose
        ([Validators.pattern('[a-zA-z ]*'), Validators.minLength(3)])]),
      lastName: new FormControl('', [Validators.required, Validators.compose
        ([Validators.pattern('[a-zA-z ]*'), Validators.minLength(3)])]),
      email: new FormControl('', [Validators.required, Validators.compose
        ([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]),
      telNumber: new FormControl('', [Validators.required, Validators.compose
        ([Validators.pattern('[0-9+ ]*'), Validators.minLength(8), Validators.maxLength(12)])]),
      content: new FormControl('', Validators.required)
    });
  }

  saveForm(submitForm: FormGroup) {
    if (submitForm.valid) {
      const message = submitForm.value;
      this.contactService.addMessage(message)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/']);
          }
        );
    }
  }
}
