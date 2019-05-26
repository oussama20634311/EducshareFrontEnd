import { PagerService } from './../../pager/service/pager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Departement } from './../departement';
import { DepartmentService } from './../service/department.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var $;

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.scss']
})
export class ListDepartmentComponent implements OnInit {

  departements: Departement[] = null;
  message: string;
  submitted: boolean = false;
  // array of all items to be paged
  private allItems: Departement[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
/*@ViewChild = decorator est utilisé pour accéder à un composant enfant,
 présent dans le modèle, afin que vous puissiez accéder à ses propriétés et méthodes.*/
  @ViewChild('modal') modal: ElementRef;

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private pagerService: PagerService
    ) { }

  ngOnInit() {
    this.getDepartments();
    this.departmentService.currentMessage.subscribe(message => this.message = message);
    if (this.message === 'True') {
      this.submitted = true;
      $(this.modal.nativeElement).modal('show');
    }
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  getDepartments() {
    this.departmentService.getAllDepartements().subscribe(
      (departements: Departement[]) => {
      this.departements = departements;
      // set items to json response
      this.allItems = this.departements;
      // initialize to page 1
      this.setPage(1);
      });

  }

  goAdd(): void {
   const link = [`departments/form` , -1];
   this.router.navigate(link);
    }

  goDisplay(departement: Departement): void {
   const link = ['departments' , departement.id];
   this.router.navigate(link);
  }

  goEdit(departement: Departement): void {
    const link = [`departments/form/${departement.id}`];
    this.router.navigate(link);
  }

  delete(departement: Departement): void {
  this.departmentService.deleteDepartement(departement).subscribe(
     reponse => {
      const link = [`departments`];
      this.router.navigate(link);
      this.getDepartments();
     }
   );
  }

}
