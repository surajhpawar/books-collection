import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import { CategoryListRoutingModule } from './category-list.routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NotificationComponent } from 'src/app/shared/components/notification-component/notification.component';

@NgModule({
	declarations: [CategoryListComponent, NotificationComponent],
	entryComponents: [NotificationComponent],
	imports: [
		CommonModule,
		FormsModule,
		CategoryListRoutingModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		MatProgressBarModule,
		MatSnackBarModule
	]
})

export class CategoryListModule {
}
