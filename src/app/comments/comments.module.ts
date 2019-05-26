import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayCommentComponent } from './display-comment/display-comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCommentComponent } from './list-comment/list-comment.component';

@NgModule({
  declarations: [
    AddCommentComponent,
    DisplayCommentComponent,
    ListCommentComponent
  ],
  exports: [
    AddCommentComponent,
    ListCommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule      ]
})
export class CommentsModule { }
