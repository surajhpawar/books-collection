import { Author } from './author.model';

export interface Book {
	authors: Array<Author>;
	bookshelves: Array<string>;
	download_count: number;
	formats: any;
	id: number;
	languages: Array<string>;
	media_type: string;
	subjects: Array<string>;
	title: string;
	image?: string;
	author?: string;
}
