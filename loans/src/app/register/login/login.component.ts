import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  available = false
  data = {
    email:"",
    username:"",
    password:"",
    password2:""
  }
  constructor(
    private router:Router,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
  }
  login(){
    const data={
      username:this.data.email,
      password:this.data.password
    }
    this.auth.loginAccount(
        data
      ).subscribe(uid=>{
          uid ? this.router.navigate([""]) : 0
        })
      }

  signup(){

    if (this.data.password == this.data.password2){
        this.auth.registerAccount(
            this.data
          ).subscribe(res=>{
              console.log(res)
            })
          }
      }

  forgotpwd(){
    console.log('fpwd')
    // this.router.navigate(["login/forgotpassword"])
  }

}
