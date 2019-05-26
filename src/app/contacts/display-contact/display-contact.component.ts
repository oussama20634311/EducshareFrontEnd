import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../contact';

@Component({
  selector: 'app-display-contact',
  templateUrl: './display-contact.component.html',
  styleUrls: ['./display-contact.component.scss']
})
export class DisplayContactComponent implements OnInit {

  message: Message ;

  constructor(
    private router: Router,
    private contactService: ContactService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { //recuperer le identifiant affiche dans URL
    const id = +this.route.snapshot.paramMap.get('id');
		this.contactService.getMessage(id)
  	.subscribe(message => this.message = message);
  }

  goBack(): void {
 	this.router.navigate(['/admin/dashboard']);
	}

	delete(message: Message): void {
		this.contactService.deleteMessage(message)
		.subscribe(_ => this.goBack());
	}

}
