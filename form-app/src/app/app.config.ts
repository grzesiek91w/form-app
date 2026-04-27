import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import * as AuraTheme from '@primeng/themes/aura';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    providePrimeNG({
      theme: {
        preset: AuraTheme.default || AuraTheme,
        options: {
          darkModeSelector: '.my-app-dark',

          cssLayer: {
            name: 'primeng',

          }

        }
      }
    })
  ]
};
