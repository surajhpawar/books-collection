import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GENRES } from 'src/app/shared/providers/genres.provider';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

	genresList = GENRES;

	constructor() {
	}

	ngOnInit(): void {
	}
}
