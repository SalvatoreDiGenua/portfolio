import { Component, signal } from '@angular/core';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  readonly isOpen = signal(false);

  readonly links: NavLink[] = [
    { label: 'Chi sono', href: '#about' },
    { label: 'Competenze', href: '#skills' },
    { label: 'Esperienza', href: '#experience' },
    { label: 'Formazione', href: '#education' },
    { label: 'Contatti', href: '#contact' }
  ];

  toggleMenu(): void {
    this.isOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }
}
