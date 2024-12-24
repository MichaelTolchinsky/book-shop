import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/common/interceptors/auth.interceptor';
import { CartService } from './app/common/services/cart.service';
import { AuthGuard } from './app/common/guards/auth.guard';
import { BookCreateComponent } from './app/components/books/book-create/book-create.component';
import { BookDetailsComponent } from './app/components/books/book-details/book-details.component';
import { BookListComponent } from './app/components/books/book-list/book-list.component';
import { CartComponent } from './app/components/cart/cart.component';
import { LoginComponent } from './app/components/auth/login/login.component';
import { SignupComponent } from './app/components/auth/signup/signup.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ErrorInterceptor } from './app/common/interceptors/error.interceptor';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:BookListComponent},
  {path:'addbook',component:BookCreateComponent,canActivate:[AuthGuard]},
  {path:'edit/:bookId',component:BookCreateComponent,canActivate:[AuthGuard]},
  {path:'details/:bookId',component:BookDetailsComponent,canActivate:[AuthGuard]},
  {
    path:'cart',component:CartComponent,canActivate:[AuthGuard],
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {path:'**',redirectTo:'/auth/login',pathMatch:'full'}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CartService,
    AuthGuard
  ],
});
