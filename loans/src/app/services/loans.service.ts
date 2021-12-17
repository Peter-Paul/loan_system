import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  private url = "http://127.0.0.1:8000/api/loan/"

  constructor(
    private http:HttpClient
  ) { }

  //get requests
  fetchLoans(){
  return this.http.get(this.url+"loan-list/")
  }
  //get with id requests
  getLoan(pid){
    return this.http.get(`${this.url}loan/${pid}/`)
  }
  //post requests
  createLoan(data):Observable<any>{
    return this.http.post(this.url+"loan-list/",data).pipe(
      catchError(err=>{
        console.log(err)
        return err}),
      map(res=>{return res})
    )
  }
  //patch requests
  updateLoan(data,pid):Observable<any>{
    return this.http.patch(`${this.url}loan/${pid}/`,data).pipe(
      catchError(err=>{
        console.log(err)
        return err}),
      map(res=>{
        console.log(res)
        return res})
    )
  }
  //delete requests
  deleteLoan(pid){
    return this.http.delete(`${this.url}loan/${pid}/`)
  }

}
