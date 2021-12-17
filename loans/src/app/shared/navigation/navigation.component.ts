import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() exit: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  leave(){
    this.exit.emit()
  }
}
