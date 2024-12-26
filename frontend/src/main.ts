import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/common/interceptors/auth.interceptor';
import { AuthGuard } from './app/common/guards/auth.guard';
import { BookListComponent } from './app/components/books/book-list/book-list.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ErrorInterceptor } from './app/common/interceptors/error.interceptor';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: BookListComponent },
  {
    path: 'home',
    component: BookListComponent,
  },
  {
    path: 'addbook',
    loadComponent: () =>
      import('src/app/components/books/book-create/book-create.component').then(c => c.BookCreateComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:bookId',
    loadComponent: () =>
      import('src/app/components/books/book-create/book-create.component').then(c => c.BookCreateComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'details/:bookId',
    loadComponent: () =>
      import('src/app/components/books/book-details/book-details.component').then(c => c.BookDetailsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('src/app/components/cart/cart.component').then(c => c.CartComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('src/app/components/auth/login/login.component').then(c => c.LoginComponent),
      },
      {
        path: 'signup',
        loadComponent: () => import('src/app/components/auth/signup/signup.component').then(c => c.SignupComponent),
      },
    ],
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
});
