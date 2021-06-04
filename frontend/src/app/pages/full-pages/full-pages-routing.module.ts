import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { AccountSettingsComponent } from './account-settings/account-settings.component';


const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: {
          title: 'Account Settings Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
