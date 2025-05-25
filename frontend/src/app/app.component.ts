import { Component } from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout(): void {
    this.authService.logout(); // Supprime le token + redirige
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated(); // Vérifie la présence du token
  }

  get username(): string | null {
    return this.authService.getUsername();
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
