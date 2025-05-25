import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { BookService } from '../../core/services/book.service';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-book-add',
  imports: [
    ReactiveFormsModule, NgIf
  ],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.scss'
})
export class BookAddComponent {
  bookForm: FormGroup;

  formTitle = 'Ajouter un livre';
  submitLabel = 'Ajouter';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      summary: [''],
      isbn: ['']
    });
  }

  onSubmit(): void {
    this.bookService.addBook(this.bookForm.value).subscribe({
      next: () => {
        this.toastr.success('📚 Livre ajouté !');
        this.router.navigate(['/books']);
      },
      error: () => {
        this.toastr.error('Erreur lors de l’ajout.');
      }
    });
  }
}
