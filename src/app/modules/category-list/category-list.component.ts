import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {

	searchText: string;
	genre: string;

	pageSetting = { page: 1, previousPage: null, nextPage: null };
	isLoading: boolean;
	booksList: any[] = [];
	noImage = '../../../assets/images/no_image.png';

	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _commonService: CommonService,
		private _cdr: ChangeDetectorRef
	) {
		this._activatedRoute.queryParamMap.subscribe(params => {
			this.genre = params.get('genre');
		});
	}

	getImage(formats) {
		let image = '';
		for (let key in formats) {
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
	}

	loadBooks(): void {
		if (this.searchText && this.searchText.length) {
			this.searchBooks();
		} else {
			this.isLoading = true;
			this._commonService.getBooksList(this.genre, this.pageSetting).subscribe((books: any) => {
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
		this._commonService.getBooksListBySearch(this.genre, this.searchText, this.pageSetting)
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
		this.searchBooks();
	}

	clearSearch(): void {
		this.searchText = '';
		this.loadBooks();
	}

	redirectBack(): void {
		this._router.navigate(['/books/dashboard']);
	}
}
