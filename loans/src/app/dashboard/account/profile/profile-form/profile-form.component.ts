import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  @Input() user
  @Output()update:EventEmitter<any>=new EventEmitter
  duplicateUser
  constructor() { }

  ngOnInit(): void {
    this.duplicateUser={
      email:this.user.email,
      username:this.user.username,
      firstname:this.user.firstname,
      lastname:this.user.lastname,
      nin:this.user.nin,
      mobile:this.user.mobile,
      phaddress:this.user.phaddress,
      poaddress:this.user.poaddress,
      occupation:this.user.occupation,
      gnumber:this.user.gnumber,
      dob:this.user.dob,
    }
  }
  updateInfo(){
    const dob = this.duplicateUser.dob.split("/")
    console.log(dob)
    const data={
      origin:'up',
      data:this.duplicateUser
    }
    this.update.emit(data)
  }

}
