import { inject, Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  private authService = inject(AuthService);

  intercept(req:HttpRequest<any>,next:HttpHandler){
    const authToken = this.authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization','Bearer '+ authToken)
    });
    return next.handle(authReq);
  }
}