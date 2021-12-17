import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})
export class CreateLoanComponent implements OnInit {
  @Input() user
  @Output() addLoan:EventEmitter<any>=new EventEmitter()
  loan
  constructor() { }

  ngOnInit(): void {
    this.loan={
      lamount:"",
      interest:"",
      security:"",
      installments:"",
      irate:"",
      adate:"",
      duration:"",
      edate:"",
      paid:"",
      user:this.user.id,
    }
  }
  createLoan(){
    this.addLoan.emit(this.loan)
  }

}
