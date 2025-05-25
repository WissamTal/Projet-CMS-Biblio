import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { BookService } from '../../core/services/book.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-book-edit',
  imports: [
    ReactiveFormsModule, NgIf
  ],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.scss'
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  bookId!: number;

  formTitle = 'Modifier le livre';
  submitLabel = 'Mettre à jour';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      summary: [''],
      isbn: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookId = +id;
      this.bookService.getBook(this.bookId).subscribe(book => {
        this.bookForm.patchValue(book);
      });
    }
  }

  onSubmit(): void {
    this.bookService.updateBook(this.bookId, this.bookForm.value).subscribe(() => {
      this.router.navigate(['/books']);
    });
  }
}
