import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import {strongPasswordValidator} from '../../core/validators/password.validator';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, strongPasswordValidator]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.authService.register(formData).subscribe({
        next: () => {
          // ✅ Auto-login juste après inscription
          this.authService.login({
            username: formData.username,
            password: formData.password
          }).subscribe({
            next: () => this.router.navigate(['/books']),
            error: () => this.router.navigate(['/login'])  // fallback
          });
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erreur lors de la création du compte.';
        }
      });
    }
  }
}
