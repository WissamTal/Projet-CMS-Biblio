import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { BookService, Book } from '../../core/services/book.service';
import {NgIf} from '@angular/common';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ConfirmModalComponent} from '../../shared/components/confirm-modal.component';


@Component({
  selector: 'app-book-detail',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent implements OnInit {
  book?: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBook(+id).subscribe({
        next: (data) => this.book = data,
        error: (err) => console.error('Erreur lors du chargement du livre :', err)
      });
    }
  }
  onDelete(): void {
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true });
    modalRef.componentInstance.message = "🛑 Supprimer ce livre de votre collection ?";

    modalRef.result.then((confirmed) => {
      if (confirmed && this.book) {
        this.bookService.deleteBook(this.book.id).subscribe(() => {
          this.toastr.success('Livre supprimé 🗑️');
          this.router.navigate(['/books']);
        });
      }
    }).catch(() => {});
  }

}
