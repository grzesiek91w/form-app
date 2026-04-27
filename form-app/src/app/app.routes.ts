import { Routes } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form';
import { AboutComponent } from './components/about/about';

export const routes: Routes = [
  { path: '', component: ClientFormComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
