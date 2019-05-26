import { ContactComponent } from './contact/contact.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DisplayContactComponent } from './display-contact/display-contact.component';
import { ListContactComponent } from './list-contact/list-contact.component';

const ContactRoutes: Routes = [
  { path: 'contact/:id' , component: DisplayContactComponent },
  { path: 'contact' , component: ContactComponent },
  { path: 'contacts' , component: ListContactComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ContactRoutes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
