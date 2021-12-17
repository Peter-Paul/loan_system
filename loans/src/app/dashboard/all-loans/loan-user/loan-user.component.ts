import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-user',
  templateUrl: './loan-user.component.html',
  styleUrls: ['./loan-user.component.css']
})
export class LoanUserComponent implements OnInit {
  @Input() username
  @Input() users
  user
  constructor() { }

  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.users.map(u=>{
      if (u.username==this.username){
        this.user=u
      }
    })
  }

}
