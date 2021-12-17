import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.css']
})
export class AllLoansComponent implements OnInit {
  user
  users
  allLoans
  userLoans=[]
  closeResult
  success=true
  constructor(
    private auth:AuthService,
    private loan:LoansService,
    private ms:NgbModal
  ) { }

  ngOnInit(): void {
    this.getUsers()
    this.getUser()
  }

  getUser(){
    return this.auth.fetchUser().subscribe(res=>{
      this.user = res
      const user_info=Object.values(this.user)
      user_info.includes("")?this.user.complete=false:this.user.complete=true
      this.getAllLoans()
    })
  }
  getUsers(){
    return this.auth.fetchUsers().subscribe(res=>{
      this.users = res
      console.log(res)
    })
  }

  getAllLoans(){
    return this.loan.fetchLoans().subscribe(res=>{
      (res as any).map(l=>{
        // Lets get the username instead of the id
        (this.users as any).map(u=>{
          if (u.id==l.user){
            l.username=u.username
          }
        })
        // Lets get the loans of the current user
        if(l.user==this.user.id){
          this.userLoans.push(l)
        }

      })
      this.allLoans=res
      console.log(res)
    })
  }
  createLoan(data){
    (this.userLoans as any).push(data)
    return this.loan.createLoan(data).subscribe(res=>{console.log(res)})
  }
  updateLoan(data){
    return this.loan.updateLoan(data.data,data.id).subscribe(res=>{console.log(res)})
  }
  deleteLoan(id){
    this.allLoans = this.allLoans.filter(l=>{
      if(l.id!=id){
        return l
      }
    })
    this.userLoans = this.userLoans.filter(l=>{
      if(l.id!=id){
        return l
      }
    })
    return this.loan.deleteLoan(id).subscribe(res=>{console.log(res)})
  }

  open(content) {
    this.ms.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
