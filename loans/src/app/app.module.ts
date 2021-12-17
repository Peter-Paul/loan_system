import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './register/login/login.component';
import { ForgotpwdComponent } from './register/forgotpwd/forgotpwd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { AllLoansComponent } from './dashboard/all-loans/all-loans.component';
import { LoanListComponent } from './dashboard/all-loans/loan-list/loan-list.component';
import { CreateLoanComponent } from './dashboard/all-loans/create-loan/create-loan.component';
import { AccountComponent } from './dashboard/account/account.component';
import { ProfileComponent } from './dashboard/account/profile/profile.component';
import { ProfileFormComponent } from './dashboard/account/profile/profile-form/profile-form.component';
import { LoanInfoComponent } from './dashboard/all-loans/loan-info/loan-info.component';
import { LoanUpdateComponent } from './dashboard/all-loans/loan-update/loan-update.component';
import { LoanUserComponent } from './dashboard/all-loans/loan-user/loan-user.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ForgotpwdComponent,
    AllLoansComponent,
    LoanListComponent,
    CreateLoanComponent,
    AccountComponent,
    ProfileComponent,
    ProfileFormComponent,
    LoanInfoComponent,
    LoanUpdateComponent,
    LoanUserComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [AuthService,AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
