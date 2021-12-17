import { Injectable,Injector } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http"
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector:Injector,
  ) { }

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    const unauthorisedUrls=[
      'http://127.0.0.1:8000/api/token/refresh/',
      'http://127.0.0.1:8000/api/users/login/',
      'http://127.0.0.1:8000/api/users/register/',
    ]
    if (unauthorisedUrls.includes(req.url)){
      return next.handle(req)
    }else{
      let auth = this.injector.get(AuthService)
      let tokenReq=req.clone({
        setHeaders:{
          "Content-Type": "application/json",
          Authorization:`Bearer ${auth.getAccess()}`
        }
      })
      return next.handle(tokenReq)
    }
  }
}
