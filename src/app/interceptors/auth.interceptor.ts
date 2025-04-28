import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    let modifiedReq = request;
    if(token){
      modifiedReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
        withCredentials: true 
      });
      return next.handle(modifiedReq);
    }else{
      modifiedReq = request.clone({
        withCredentials: true // 👈 Mesmo sem token, queremos mandar cookie/session
      });
    }
    return next.handle(modifiedReq);
    
  }
}

export const AuthInterceptorProvider = [
  {
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  }
]