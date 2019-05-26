import { CommentsModule } from './../comments/comments.module';
import { PagerModule } from './../pager/pager.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents.routing.module';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { ListDocumentsComponent } from './list-documents/list-documents.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { DocumentService } from './service/document.service';
import { DisplayDocumentComponent } from './display-document/display-document.component';

@NgModule({
  declarations: [
    EditDocumentComponent,
    ListDocumentsComponent,
    AddDocumentComponent,
    DisplayDocumentComponent
   ],
  providers: [DocumentService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentsRoutingModule,
    PagerModule,
    CommentsModule

  ]
})
export class DocumentsModule { }
