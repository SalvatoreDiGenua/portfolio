import { Component, inject, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../../core/i18n/language.service';

interface NavLink {
  key: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  readonly isOpen = signal(false);
  readonly languageService = inject(LanguageService);
  readonly links: NavLink[] = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.skills', href: '#skills' },
    { key: 'nav.experience', href: '#experience' },
    { key: 'nav.education', href: '#education' },
    { key: 'nav.contact', href: '#contact' },
  ];

  toggleMenu(): void {
    this.isOpen.update((open) => !open);
  }
  closeMenu(): void {
    this.isOpen.set(false);
  }
  toggleLanguage(): void {
    this.languageService.toggle();
  }
}
