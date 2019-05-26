import { User } from 'src/app/users/user';
import { AuthenticationService } from './../../service/authentication.service';
import { UniversityService } from './../../universities/service/university.service';
import { University } from './../../universities/university';
import { DepartmentService } from './../../departements/service/department.service';
import { Departement } from './../../departements/departement';
import { MatterService } from './../../matters/service/matter.service';
import { Matter } from './../../matters/matter';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DocumentService } from './../service/document.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  myform: FormGroup;
  public enonceFile: File;
  public isMessage: boolean = false;

  public imagePath;
  public message: string;
  public IfSelectedFile: boolean = false;
  public selectedRoleUser: string;

  public matterList: Matter[];
  public departmentList: Departement[];
  public universityList: University[];
  universities: University[] = null;
  public currentUser: User;

  constructor(
     private documentService: DocumentService,
     private router: Router,
     private fb: FormBuilder,
     private matterService: MatterService,
     private departmentService: DepartmentService,
     private universityService: UniversityService,
     private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.myform = this.fb.group({
      documentName: new FormControl(),
      documentMatter: new FormControl(),
      documentTheme: new FormControl(),
      documentType: new FormControl(),
      documentDepartment: new FormControl(),
      documentUniversity: new FormControl(),
      documentLevel: new FormControl(),
      documentYear: new FormControl(),
      userId: new FormControl()
    });

    // Get List of Matters
    this.matterService.getAllMatters().subscribe(
      (matters: Matter[]) => {
      this.matterList = matters;
      console.log('Matter List', this.matterList);
      });

    // Get List of Departments
    this.departmentService.getAllDepartements().subscribe(
      (departments: Departement[]) => {
      this.departmentList = departments;
      console.log('Department List', this.departmentList);
      });

    // Get List of Universities
    this.universityService.getAllUniversities().subscribe(
      (universities: University[]) => {
      this.universityList = universities;
      console.log('Universities List', this.universityList);
      });

  // Get current user.
    this.authenticationService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (user: User) => {
        this.currentUser = user;
        console.log('Current user', this.currentUser);
        this.myform.get('userId').setValue(this.currentUser.id);
        });
  }

  saveForm(submitForm: FormGroup) {
    if (submitForm.valid) {
      console.log(submitForm.value);
      const document = submitForm.value;
      const formData: FormData = new FormData();
      formData.append('document', JSON.stringify(document));
      formData.append('file', this.enonceFile);
      console.log('form Data  =' + JSON.stringify(document));
      this.documentService.AddDocument(formData)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/']);
          }
        );
    }
  }

    onSelectFile(event) {
      this.IfSelectedFile = true;
      const file = event.target.files[0];
      console.log(file);
      this.enonceFile = file;
      if (file.length === 0) {
        return;
      }
      const mimeType = event.target.files[0].type;
      if (mimeType != 'application/pdf') {
        this.message = 'Veuillez insérer un document PDF.';
        this.isMessage = true;
        return;
      }
  }
}

