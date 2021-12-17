import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

interface Loan {
  id: number;
  lamount:string,
  interest:string,
  security:string,
  installments:string,
  irate:string,
  adate:string,
  duration:string,
  edate:string,
  paid:string,
  user: number;
}

export type SortColumn = keyof Loan | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}


@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  @Input() user
  @Input() users
  @Input() loans
  @Output() openModel:EventEmitter<any>=new EventEmitter()
  @Output() editLoan:EventEmitter<any>=new EventEmitter()
  @Output() removeLoan:EventEmitter<any>=new EventEmitter()

  page = 1;
  pageSize = 4;
  collectionSize
  allLoans
  success=true

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor() {
  }

  ngOnInit(): void {

  }
  open(data){
    this.openModel.emit(data)
  }

  updateLoan(data){
    this.editLoan.emit(data)
  }

  deleteLoan(id){
    this.removeLoan.emit(id)
  }

  onSort(data) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== data.column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (data.direction === '' || data.column === '') {
      this.loans = this.loans;
    } else {
      this.loans = [...this.loans].sort((a, b) => {
        const res = compare(a[data.column], b[data.column]);
        return data.direction === 'asc' ? res : -res;
      });
    }
  }

}
