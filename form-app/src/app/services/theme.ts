import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDarkMode = signal<boolean>(localStorage.getItem('theme') === 'dark');

  constructor() {
    effect(() => {
      const darkMode = this.isDarkMode();

      const root = document.documentElement;

      if (darkMode) {
        root.classList.add('my-app-dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('my-app-dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }
}
