import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GENRES } from 'src/app/shared/providers/genres.provider';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

	genresList = GENRES;

	constructor(
		private _router: Router
	) {
	}

	ngOnInit(): void {
	}

	redirectToGenre(genre: any): void {
		this._router.navigate(['/books/category'], {
			queryParams: {
				genre: genre.value
			}
		});
	}
}
