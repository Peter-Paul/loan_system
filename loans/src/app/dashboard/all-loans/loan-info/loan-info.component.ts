import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.css']
})
export class LoanInfoComponent implements OnInit {
  @Input() loan
  @Input() user
  @Output() openModel:EventEmitter<any>=new EventEmitter()
  duration
  paidInstallments
  eamount
  constructor() { }

  ngOnInit(): void {
    this.loanMetrics()
  }
  loanMetrics(){
    this.eamount=parseInt(this.loan.lamount)+parseInt(this.loan.interest)
    const amount_per_installment=(parseInt(this.loan.lamount)+parseInt(this.loan.interest))/parseInt(this.loan.installments)
    this.paidInstallments=parseInt(this.loan.paid)/amount_per_installment
    this.paidInstallments=parseInt(this.paidInstallments)
  }
  open(data){
    this.openModel.emit(data)
  }
}
