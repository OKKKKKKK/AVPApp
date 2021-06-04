import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { AgmCoreModule } from "@agm/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


import { AccountSettingsComponent } from "./account-settings/account-settings.component";

@NgModule({
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    NgbModule,
  ],
  declarations: [
    AccountSettingsComponent,
  ],
})
export class FullPagesModule {}
