import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookListApiResponse } from '../models/book-list.model';
import { Page } from '../models/page.model';

@Injectable({
	providedIn: 'root'
})
export class CommonService {

	GET_BOOKS_LIST = 'http://skunkworks.ignitesol.com:8000/books';

	constructor(private _httpClient: HttpClient) {
	}

	getBooksList(topic: string, pageSetting: Page): Observable<BookListApiResponse> {
		const httpParams = new HttpParams()
			.append('topic', topic)
			.append('mime_type', 'image/')
			.append('page', String(pageSetting.pageIndex));
		return this._httpClient.get<BookListApiResponse>(this.GET_BOOKS_LIST, { params: httpParams });
	}

	getBooksListBySearch(topic: string, searchText: string, pageSetting: Page): Observable<BookListApiResponse> {
		const httpParams = new HttpParams()
			.append('topic', topic)
			.append('mime_type', 'image/')
			.append('page', String(pageSetting.pageIndex))
			.append('search', searchText);
		return this._httpClient.get<BookListApiResponse>(this.GET_BOOKS_LIST, { params: httpParams });
	}

	getNextBooksList(nextPageListUrl: string): Observable<BookListApiResponse> {
		return this._httpClient.get<BookListApiResponse>(nextPageListUrl);
	}

	getPreviousBooksList(previousPageListUrl: string): Observable<BookListApiResponse> {
		return this._httpClient.get<BookListApiResponse>(previousPageListUrl);
	}
}
