import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/auth/auth.interptor';
import { CartService } from './app/cart/cart.service';
import { ErrorInterceptor } from './app/error.interceptor';
import { AuthGuard } from './app/auth/auth.guard';
import { BookCreateComponent } from './app/books/book-create/book-create.component';
import { BookDetailsComponent } from './app/books/book-details/book-details.component';
import { BookListComponent } from './app/books/book-list/book-list.component';
import { CartComponent } from './app/cart/cart.component';
import { LoginComponent } from './app/auth/login/login.component';
import { SignupComponent } from './app/auth/signup/signup.component';

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
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CartService,
    AuthGuard
  ],
});
