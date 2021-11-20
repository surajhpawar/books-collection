import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CommonService {

	GET_BOOKS_LIST = 'http://skunkworks.ignitesol.com:8000/books';

	constructor(private _httpClient: HttpClient) {
	}

	getBooksList(genre: string, pageSetting: any): Observable<any> {
		const httpParams = new HttpParams()
			.append('topic', genre)
			.append('page', pageSetting.page);
		return this._httpClient.get<any>(this.GET_BOOKS_LIST, { params: httpParams });
	}

	getBooksListBySearch(genre: string, searchText: string, pageSetting: any): Observable<any> {
		const httpParams = new HttpParams()
			.append('topic', genre)
			.append('page', pageSetting.page)
			.append('search', searchText);
		return this._httpClient.get<any>(this.GET_BOOKS_LIST, { params: httpParams });
	}
}
