import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {

	genre: string;

	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) {
		this._activatedRoute.queryParamMap.subscribe(params => {
			this.genre = params.get('genre');
		});
	}

	ngOnInit(): void {
	}

	redirectBack(): void {
		this._router.navigate(['/books/dashboard']);
	}
}
