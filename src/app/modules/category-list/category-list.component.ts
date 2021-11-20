import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification-component/notification.component';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {

	searchText: string;
	topic: string;
	isLoading: boolean;

	pageSetting = { page: 1, previousPage: null, nextPage: null };
	booksList: any[] = [];
	noImage = '../../../assets/images/no_image.png';

	private subject: Subject<string> = new Subject();

	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _commonService: CommonService,
		private _cdr: ChangeDetectorRef,
		private _snackBar: MatSnackBar
	) {
		this._activatedRoute.queryParamMap.subscribe(params => {
			this.topic = params.get('topic');
		});
	}

	getImage(formats) {
		let image = '';
		for (const key in formats) {
			if (key.match(/image\/*/i)) {
				image = formats[key];
			}
		}

		if (image?.length) {
			return image;
		}

		return this.noImage;
	}

	ngOnInit(): void {
		this.loadBooks();
		(this.subject.pipe(debounceTime(300), distinctUntilChanged())).subscribe(searchTextValue => {
			this.searchBooks();
		});
	}

	loadBooks(): void {
		if (this.searchText && this.searchText.length) {
			this.searchBooks();
		} else {
			this.isLoading = true;
			this._commonService.getBooksList(this.topic, this.pageSetting).subscribe((books: any) => {
				books.results.forEach(book => {
					book.image = this.getImage(book.formats);
					book.author = book.authors[0]?.name.split(', ')?.reverse().join(' ') || 'NA';
				});
				this.booksList = books.results;
				this.isLoading = false;
				this._cdr.markForCheck();
			}, error => {
				this.isLoading = false;
			});
		}
	}

	searchBooks(): void {
		this.isLoading = true;
		this._commonService.getBooksListBySearch(this.topic, this.searchText, this.pageSetting)
			.subscribe((books: any) => {
				books.results.forEach(book => {
					book.image = this.getImage(book.formats);
					book.author = book.authors[0]?.name.split(', ')?.reverse().join(' ') || 'NA';
				});
				this.booksList = books.results;
				this.isLoading = false;
				this._cdr.markForCheck();
			}, error => {
				this.isLoading = false;
			});
	}

	searchChange(): void {
		this.subject.next(this.searchText);
	}

	clearSearch(): void {
		this.searchText = '';
		this.loadBooks();
	}

	onBookView(book: any): void {
		const url = this.getMimeType(book.formats);
		if (!url) {
			this._snackBar.openFromComponent(NotificationComponent, {
				data: '<span class="text-color-default">No viewable version available. <br /> Try Again </span>',
				duration: 40000
			});
		} else {
			window.open(url, '_blank');
		}
	}

	getMimeType(formats) {
		for (let format in formats) {
			if (formats[format]) {
				const html = format.match(/text\/html/i);
				if (html) {
					return formats[format];
				}
				const txt = format.match(/^.+\.txt$/i);
				if (txt) {
					return formats[format];
				}
				const pdf = format.match(/^.+\.pdf$/i);
				if (pdf) {
					return formats[format];
				}
			}
		}
		return null;
	}

	redirectBack(): void {
		this._router.navigate(['/books/dashboard']);
	}
}
