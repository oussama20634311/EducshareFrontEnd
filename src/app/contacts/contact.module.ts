import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { ListContactComponent } from './list-contact/list-contact.component';
import { PagerModule } from '../pager/pager.module';
import { ContactRoutingModule } from './contact.routing.module';
import { ContactService } from './service/contact.service';
import { DisplayContactComponent } from './display-contact/display-contact.component';

@NgModule({
  declarations: [
    ContactComponent,
    ListContactComponent,
    DisplayContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagerModule,
    ContactRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  exports: [
    ContactComponent,
    ListContactComponent
  ],
  providers: [ContactService]

})
export class ContactModule { }
