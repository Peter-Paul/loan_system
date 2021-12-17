import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loan-update',
  templateUrl: './loan-update.component.html',
  styleUrls: ['./loan-update.component.css']
})
export class LoanUpdateComponent implements OnInit {
  @Input() user
  @Input() loan
  @Output() openModel:EventEmitter<any>=new EventEmitter()
  @Output() editLoan:EventEmitter<any>=new EventEmitter()
  time=""
  constructor() { }

  ngOnInit(): void {
  }
  updateLoan(){
    if (this.loan.adate==''&&this.loan.edate==''){
      const d=new Date()
      this.loan.adate= d.setFullYear(d.getFullYear(),d.getMonth(),d.getDate()).toString()
      const yearsAdded=Math.trunc((d.getMonth()+parseInt(this.loan.duration))/12)
      const monthsAdded=parseInt(this.loan.duration)-(yearsAdded*12)
      this.loan.edate= d.setFullYear(d.getFullYear()+yearsAdded,d.getMonth()+monthsAdded,d.getDate()).toString()
      this.loan.irate=(this.loan.interest/(this.loan.lamount*parseInt(this.loan.duration))).toString()
    }else{
      const d=new Date()
      const from_date=new Date(parseInt(this.loan.adate.slice(0,10))*1000).getDate()
      const from_month=new Date(parseInt(this.loan.adate.slice(0,10))*1000).getMonth()
      const from_year=new Date(parseInt(this.loan.adate.slice(0,10))*1000).getFullYear()
      const yearsAdded=Math.trunc((from_month+parseInt(this.loan.duration))/12)
      const monthsAdded=parseInt(this.loan.duration)-(yearsAdded*12)
      this.loan.edate= d.setFullYear(from_year+yearsAdded,from_month+monthsAdded,from_date).toString()
      this.loan.irate=(this.loan.interest/(this.loan.lamount*parseInt(this.loan.duration))).toString()
    }
    this.user.is_staff?this.loan.active=true:this.loan.active=false
    this.editLoan.emit({data:this.loan,id:this.loan.id})
  }

}
