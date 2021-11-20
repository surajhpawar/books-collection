import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification-component/notification.component';
import { BookListApiResponse } from 'src/app/shared/models/book-list.model';
import { Book } from 'src/app/shared/models/book.model';
import { Page } from 'src/app/shared/models/page.model';

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
	nextLoading: boolean;

	pageSetting: Page = { pageIndex: 1, previous: null, next: null };
	booksList: Book[] = [];
	noImage = '../../../assets/images/no_image.png';

	private subject: Subject<string> = new Subject();

	@HostListener('scroll', ['$event'])
	onScroll(event: any) {
		if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
			this.getNextPageBooks();
		}
	}

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
			this._commonService.getBooksList(this.topic, this.pageSetting).subscribe((books: BookListApiResponse) => {
				this.pageSetting.next = books.next;
				this.pageSetting.previous = books.previous;
				books.results.forEach((book: Book) => {
					book.image = this.getImage(book.formats);
					book.author = book.authors[0]?.name.split(', ')?.reverse().join(' ') || 'Not Available';
				});
				this.booksList = books.results;
				this.isLoading = false;
				this._cdr.markForCheck();
			}, error => {
				this.isLoading = false;
				this._cdr.markForCheck();
			});
		}
	}

	getNextPageBooks(): void {
		this.nextLoading = true;
		this._cdr.markForCheck();
		this.pageSetting.pageIndex++;
		this._commonService.getNextBooksList(this.pageSetting.next).subscribe((books: BookListApiResponse) => {
			this.pageSetting.next = books.next;
			this.pageSetting.previous = books.previous;
			books.results.forEach((book: Book) => {
				book.image = this.getImage(book.formats);
				book.author = book.authors[0]?.name.split(', ')?.reverse().join(' ') || 'Not Available';
			});
			this.booksList.push(...books.results);
			this.nextLoading = false;
			this._cdr.markForCheck();
		}, error => {
			this.nextLoading = false;
			this._cdr.markForCheck();
		});

	}

	searchBooks(): void {
		this.isLoading = true;
		this.pageSetting.pageIndex = 1;
		this._commonService.getBooksListBySearch(this.topic, this.searchText, this.pageSetting)
			.subscribe((books: BookListApiResponse) => {
				books.results.forEach((book: Book) => {
					book.image = this.getImage(book.formats);
					book.author = book.authors[0]?.name.split(', ')?.reverse().join(' ') || 'Not Available';
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

	onBookView(book: Book): void {
		let url = this.getMimeType(book.formats);
		if (url && url.endsWith('.zip')) {
			url = this.zipUrlToHtml(url);
		}
		if (!url) {
			this._snackBar.openFromComponent(NotificationComponent, {
				data: '<span class="text-color-default">No viewable version available. <br /> Try Again </span>',
				duration: 40000
			});
		} else {
			window.open(url, '_blank');
		}
	}

	getMimeType(formats): string {
		for (const format in formats) {
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

	zipUrlToHtml(zipUrl: string): string {
		const splitZipUrl = zipUrl.split('.zip');
		const splitByPath = splitZipUrl[0].split('/');
		const lastPathId = splitByPath[splitByPath.length - 1];
		return splitZipUrl[0] + '/' + lastPathId + '.htm';
	}

	redirectBack(): void {
		this._router.navigate(['/books/dashboard']);
	}
}
