import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const CommentsRoutes: Routes = [];

@NgModule({
	imports: [
		RouterModule.forChild(CommentsRoutes)
	],
	exports: [
		RouterModule
	]
})
export class CommentsRoutingModule { }