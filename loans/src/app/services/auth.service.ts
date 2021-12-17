import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http"
import { Observable,of } from 'rxjs';
import { map,tap,catchError} from "rxjs/operators"
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt"

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

export interface User {
  username: string;
  email: string;
  password: string;
  password2:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://127.0.0.1:8000/api/users/"
  private refresh_url = "http://127.0.0.1:8000/api/token/refresh/"
  private access:string
  private refresh:string
  private httpOps:string

  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }

  // saves the tokens in the session
  private saveToken(access:string,refresh:string){
    sessionStorage.setItem("at",access)
    sessionStorage.setItem("rt",refresh)
    this.access = access
    this.refresh = refresh
  }
  //get tokens from session
  private fetchTokens(){
    this.access = sessionStorage.getItem("at")
    this.refresh = sessionStorage.getItem("rt")
  }

  // decodes payload from accesstoken to get user data
  private userDetails(){
    const token = sessionStorage.getItem("at")
    let payload
    if (token){
      payload = token.split(".")[1]
      payload = window.atob(payload)
      return JSON.parse(payload).user_id
    }else return null
  }

  //provides userid
  provideUid(){
    return this.userDetails()
  }

  //refreshing a token
  tokenRefresh(data):Observable<any>{
    return this.http.post(this.refresh_url,data).pipe(
      catchError(res=>{return res}),
      tap(res => {
        const access = (res as any).access
        if (access){
          this.saveToken(access,this.refresh)
        }
      }),
      map(res=>{return (res as any).access})
    )
  }

  // gets access token
  getAccess(){
    this.fetchTokens()
    const helper = new JwtHelperService()
    const isTokenExpired = helper.isTokenExpired(this.access)
    if (isTokenExpired){
      const data = {
        refresh:this.refresh
      }
      const _httpOptions = {
        headers:new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.refresh}`
        })
      }
      this.tokenRefresh(data).subscribe(res=>{
        this.access = res
        return res
      })
      return this.access
    }else{
      return this.access
    }
  }
  // creates new user
  registerAccount(user:User): Observable<any>{
    return this.http.post(this.url+"register/",user)
    .pipe(
          catchError(res=>{
            console.log(res)
            return res
          }),
          map(res=>(res as any))
      )
  }
  // logs into user account
  loginAccount(data): Observable<any> {
    return this.http.post(this.url+"login/",data).pipe(
      catchError(res=>{return res}),
      tap(res=>{
        console.log(res)
        const access = (res as any).token.access
        const refresh = (res as any).token.refresh
        if (access && refresh){
          this.saveToken(access,refresh)
        }
      }),
      map(()=>{
        let user = this.userDetails()
        return user
      })
    )
  }
  //fetches user from database
  fetchUser():Observable<any>{
    const uid = this.userDetails()
    return this.http.get(`${this.url+uid}/`).pipe(
      map(res=>{
        return res
      })
    )
  }

  fetchUsers():Observable<any>{
    return this.http.get(`${this.url}list/`).pipe(
      map(res=>{
        return res
      })
    )
  }
    //patch requests
  updateUser(data):Observable<any>{
    const uid = this.userDetails()
    return this.http.patch(`${this.url+uid}/`,data.data).pipe(
      catchError(err=>{return err}),
      map(res=>{return res})
    )
  }


  //logs out user
  logout(): void {
    // TODO: make api call to de-authenticate
    sessionStorage.removeItem("at");
    sessionStorage.removeItem("rt");
    this.router.navigate(["login"]);
  }
}
