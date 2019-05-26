import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tables: string[] = ['Utilisateurs', 'Documents', 'Departements', 'Cours',
   'Matières', 'Universités', 'Contact', 'Notifications', 'Commentaires'];
   selectedtable = this.tables[0];

   constructor() { }

  ngOnInit() {
  }
}
