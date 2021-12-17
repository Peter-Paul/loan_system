import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  thisuser
  constructor(
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    return this.auth.fetchUser().subscribe(res=>{
      console.log(res)
      this.thisuser = res
    })
  }
  updateUser(data){
    return this.auth.updateUser(data).subscribe(res=>console.log(res))
  }

}
