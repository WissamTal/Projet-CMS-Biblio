import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string | null = null;
  email: string | null = null;
  profileForm!: FormGroup;
  message: string = '';
  editMode: boolean = false; // ✅ mode édition

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.username = profile.username;
        this.email = profile.email;

        this.profileForm = this.fb.group({
          username: [profile.username, [Validators.required]],
          email: [profile.email, [Validators.required, Validators.email]],
          password: [''],
          password2: ['']
        });
      },
      error: () => {
        this.message = '❌ Impossible de charger le profil utilisateur.';
      }
    });
  }

  enableEdit(): void {
    this.editMode = true;
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.message = '✅ Profil mis à jour avec succès';

        const newUsername = this.profileForm.get('username')?.value;
        const newEmail = this.profileForm.get('email')?.value;

        if (newUsername) {
          localStorage.setItem('username', newUsername);
          this.username = newUsername;
        }

        if (newEmail) {
          localStorage.setItem('email', newEmail);
          this.email = newEmail;
        }

        this.editMode = false; // ✅ on repasse en mode affichage
      },
      error: () => {
        this.message = '❌ Une erreur est survenue';
      }
    });
  }
}
