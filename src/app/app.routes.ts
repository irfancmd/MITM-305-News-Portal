import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { NewsListComponent } from './components/news-list/news-list';
import { NewsFormComponent } from './components/news-form/news-form';
import { NewsDetailComponent } from './components/news-detail/news-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'news', component: NewsListComponent },
  { path: 'news/create', component: NewsFormComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: 'news/:id/edit', component: NewsFormComponent },
];
