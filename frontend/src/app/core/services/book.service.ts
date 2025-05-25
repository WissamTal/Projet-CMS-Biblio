import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: string;
  summary?: string;
  isbn?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8000/api/books/';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<Book[]>(`${this.apiUrl}`);
  }

  addBook(bookData: any) {
    return this.http.post(this.apiUrl, bookData);
  }

  getBook(id: number) {
    return this.http.get<Book>(`${this.apiUrl}${id}/`);
  }

  updateBook(id: number, bookData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, bookData);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  searchBooks(query: string) {
    return this.http.get<Book[]>(`${this.apiUrl}search/?q=${query}`);
  }

}
