import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TOPICS } from 'src/app/shared/providers/topics.provider';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

	topicsList = TOPICS;
	title = 'Gutenberg Project';
	infoMessage = 'A social cataloging website that allows you to freely search its database of books, annotations, and reviews.'

	constructor(
		private _router: Router
	) {
	}

	ngOnInit(): void {
	}

	redirectToTopic(topic: any): void {
		this._router.navigate(['/books/category'], {
			queryParams: {
				topic: topic.value
			}
		});
	}
}
