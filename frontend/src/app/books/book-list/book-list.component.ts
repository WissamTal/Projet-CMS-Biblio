import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../core/services/book.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from '../../shared/components/confirm-modal.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  searchTerm: string = '';
  suggestions: Book[] = [];

  private searchTerm$ = new Subject<string>();

  constructor(
    private modalService: NgbModal,
    private bookService: BookService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getBooks();

    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this.bookService.searchBooks(term))
      )
      .subscribe({
        next: (data) => {
          this.books = data;
          this.suggestions = data;
        },
        error: (err) => console.error('Erreur API search :', err)
      });
  }

  onSearchChange(term: string): void {
    this.searchTerm$.next(term);
  }

  goToBook(id: number): void {
    this.router.navigate(['/books', id]);
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error('Erreur API books :', err)
    });
  }

  onDelete(id: number): void {
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true });
    modalRef.componentInstance.message = "🌌 Voulez-vous vraiment supprimer ce livre de votre galaxie ?";

    modalRef.result.then((confirmed) => {
      if (confirmed) {
        this.bookService.deleteBook(id).subscribe(() => {
          this.books = this.books.filter(b => b.id !== id);
          this.toastr.success('Livre supprimé 🗑️');
        });
      }
    }).catch(() => {});
  }
}
