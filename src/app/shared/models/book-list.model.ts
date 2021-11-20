import { Book } from './book.model';

export interface BookListApiResponse {
	count: number;
	next: string;
	previous: string;
	results: Array<Book>;
}
