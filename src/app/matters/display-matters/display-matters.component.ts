import { MatterService } from './../service/matter.service';
import { DepartmentService } from './../../departements/service/department.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Matter } from './../matter';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-matters',
  templateUrl: './display-matters.component.html',
  styleUrls: ['./display-matters.component.scss']
})
export class DisplayMattersComponent implements OnInit {


  matter: Matter = null;
  constructor(
    private router: Router,
    private matterService: MatterService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
	 const id = +this.route.snapshot.paramMap.get('id');
		this.matterService.getMatter(id)
		.subscribe(matter => this.matter = matter);
	}

	goBack(): void {
		this.router.navigate(['/matters']);
	}

	delete(matter: Matter): void {
		this.matterService.deleteMatter(matter)
		.subscribe(_ => this.goBack());
	}


}
