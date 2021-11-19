import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'books',
		loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
	},
  {
		path: '**',
		redirectTo: 'books'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
