import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {
	}
}
