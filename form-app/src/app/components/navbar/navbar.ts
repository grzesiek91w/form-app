import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ThemeService } from 'src/app/services/theme';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, DrawerModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  protected themeService = inject(ThemeService);
  isMenuVisible = signal(false);

  navItems = [
    { label: 'Strona główna', path: '/' },
    { label: 'O nas', path: '/about' }
  ];
}
