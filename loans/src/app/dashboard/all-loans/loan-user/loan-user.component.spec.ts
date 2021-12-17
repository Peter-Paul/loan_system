import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanUserComponent } from './loan-user.component';

describe('LoanUserComponent', () => {
  let component: LoanUserComponent;
  let fixture: ComponentFixture<LoanUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
