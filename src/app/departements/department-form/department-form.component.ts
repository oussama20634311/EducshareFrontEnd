import { DepartmentService } from './../service/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from './../departement';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})

export class DepartmentFormComponent implements OnInit {

  department: Departement;
  id: number;
  myForm: FormGroup;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService ,
    private router: Router,
    private formBuilder: FormBuilder) {
    }

    ngOnInit() {
      this.departmentInfo();
      this.myForm = this.formBuilder.group({
        departementName: ['']
      });
    }

    departmentInfo() {
      this.id = +this.route.snapshot.params['id'];
      this.department = new Departement(this.id, '' , new Date(), new Date() );
      if (this.id !== -1) {
      this.departmentService.getDepartement(this.id)
      .subscribe(
        data => this.department = data
        );
      }
    }

    save(model: any) {
      if (this.id === -1) {
        this.departmentService.addDepartment(this.department)
            .subscribe (
              data => {
              console.log(data);
              this.router.navigate(['departments']);
              this.departmentService.displayModal('True');
              }
           );
      } else {
        this.departmentService.updateDepartement(this.department)
            .subscribe (
              data => {
                console.log(data);
                this.router.navigate(['departments']);
              }
            );
      }
    }
}
