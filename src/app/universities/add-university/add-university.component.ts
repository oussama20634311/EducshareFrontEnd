import { countries } from './../../countries/countries';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { University } from './../university';
import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../service/university.service';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.scss']
})
export class AddUniversityComponent implements OnInit {

  university: University;
  id: number;
  myForm: FormGroup;
  message: string;
  countries;

  constructor( private route: ActivatedRoute,
    private universityService: UniversityService ,
    private router: Router,
    private formBuilder: FormBuilder) {
    }

    ngOnInit() {

      this.countries = countries;
      this.universityService.currentMessage.subscribe(message => this.message = message);
      this.universityInfo();
      this.myForm = this.formBuilder.group({
        universityName: ['']
      });
    }

    universityInfo() {
      this.id = +this.route.snapshot.params['id'];
      this.university = new University(this.id, '', '', '', '' , '');
      if (this.id !== -1) {
      this.universityService.getUniversity(this.id)
      .subscribe(
        data => this.university = data
        );
      }
    }


    save(model: any) {

      if (this.id === -1) {
        this.universityService.addUniversity(this.university)
            .subscribe (
              data => {
              console.log(data);
              this.router.navigate(['universities']);
              this.universityService.displayModal('True');
              }
           );


      } else {
        this.universityService.updateUniversity(this.university)
            .subscribe (
              data => {
                console.log(data);
                this.router.navigate(['universities']);
              }
            );
      }

    }

}
