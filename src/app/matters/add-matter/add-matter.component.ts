import { MatterService } from './../service/matter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Matter } from './../matter';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-matter',
  templateUrl: './add-matter.component.html',
  styleUrls: ['./add-matter.component.scss']
})
export class AddMatterComponent implements OnInit {

  matter: Matter;
  id: number;
  myForm: FormGroup;
  message: string;



  constructor( private route: ActivatedRoute,
    private matterService: MatterService ,
    private router: Router,
    private formBuilder: FormBuilder) {
    }


    ngOnInit() {
      this.matterService.currentMessage.subscribe(message => this.message = message);
      this.matterInfo();
      this.myForm = this.formBuilder.group({
        departementName: ['']
      });
    }

    matterInfo() {
      this.id = +this.route.snapshot.params['id'];
      this.matter = new Matter(this.id, '' , new Date(), new Date() );
      if (this.id !== -1) {
      this.matterService.getMatter(this.id)
      .subscribe(
        data => this.matter = data
        );
      }
    }


    save(model: any) {

      if (this.id === -1) {
        this.matterService.addMatter(this.matter)
            .subscribe (
              data => {
              console.log(data);
              this.router.navigate(['matters']);
              this.matterService.displayModal('True');
              }
           );


      } else {
        this.matterService.updateMatter(this.matter)
            .subscribe (
              data => {
                console.log(data);
                this.router.navigate(['matters']);
              }
            );
      }

    }

}
