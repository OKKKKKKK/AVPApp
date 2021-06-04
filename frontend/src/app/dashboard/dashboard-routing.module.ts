import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/auth/auth-guard.service';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'safety',
        component: Dashboard1Component,
        data: {
          title: 'Safety & Comfort'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'health',
        component: Dashboard2Component,
        data: {
          title: 'Vehicle Health'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: AccountSettingsComponent,
        data: {
          title: 'User Profile'
        },
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
