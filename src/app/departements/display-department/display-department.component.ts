import { Departement } from './../departement';
import { DepartmentService } from './../service/department.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-department',
  templateUrl: './display-department.component.html',
  styleUrls: ['./display-department.component.scss']
})
export class DisplayDepartmentComponent implements OnInit {

  departement: Departement = null;
  constructor(
    private router: Router,
    private departementService: DepartmentService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
	 let id = +this.route.snapshot.paramMap.get('id');
		this.departementService.getDepartement(id)
  	.subscribe(departement => this.departement = departement);
	}

	goBack(): void {
		this.router.navigate(['/departments']);
	}

}
