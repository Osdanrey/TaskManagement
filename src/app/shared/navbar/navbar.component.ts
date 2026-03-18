import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, NgClass, TranslateModule],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  translate = inject(TranslateService);

  // Signal for mobile menu visibility
  showMobileMenu = signal(false);

  constructor() {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin() && this.authService.isAuthenticated();
  }

  isSuperAdmin(): boolean {
    return this.authService.isSuper() && this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showMobileMenu.set(false);
  }

  toggleMobileMenu() {
    this.showMobileMenu.update(value => !value);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  getCurrentLang(): string {
    return this.translate.currentLang || 'es';
  }
}
