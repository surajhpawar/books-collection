import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryListComponent} from './category-list.component';
import {CategoryListRoutingModule} from './category-list.routing.module';

@NgModule({
	declarations: [CategoryListComponent],
	imports: [
		CommonModule,
		CategoryListRoutingModule
	]
})
export class CategoryListModule {
}
