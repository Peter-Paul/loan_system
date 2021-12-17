import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './dashboard/account/account.component';
import { AllLoansComponent } from './dashboard/all-loans/all-loans.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpwdComponent } from './register/forgotpwd/forgotpwd.component';
import { LoginComponent } from './register/login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:"login",
    component:RegisterComponent,
    children:[
      {path:"", component:LoginComponent},
      {path:"forgotpassword",component:ForgotpwdComponent}
    ],
  },
  {
    path:"loans",
    component:AllLoansComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"",
    component:AccountComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
