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

	getBooksList(topic: string, pageSetting: any): Observable<any> {
		const httpParams = new HttpParams()
			.append('topic', topic)
			.append('mime_type', 'image/')
			.append('page', pageSetting.page);
		return this._httpClient.get<any>(this.GET_BOOKS_LIST, { params: httpParams });
	}

	getBooksListBySearch(topic: string, searchText: string, pageSetting: any): Observable<any> {
		const httpParams = new HttpParams()
			.append('topic', topic)
			.append('mime_type', 'image/')
			.append('page', pageSetting.page)
			.append('search', searchText);
		return this._httpClient.get<any>(this.GET_BOOKS_LIST, { params: httpParams });
	}
}
