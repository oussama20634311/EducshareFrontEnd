import { ActivatedRoute, Router } from '@angular/router';
import { University } from './../university';
import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../service/university.service';

@Component({
  selector: 'app-display-university',
  templateUrl: './display-university.component.html',
  styleUrls: ['./display-university.component.scss']
})
export class DisplayUniversityComponent implements OnInit {

  university: University = null;
  constructor(
    private router: Router,
    private universityService: UniversityService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
	 const id = +this.route.snapshot.paramMap.get('id');
		this.universityService.getUniversity(id)
		.subscribe(university => this.university = university);
	}

	goBack(): void {
		this.router.navigate(['/universities']);
	}

	delete(university: University): void {
		this.universityService.deleteUniversity(university)
		.subscribe(_ => this.goBack());
  }
}
