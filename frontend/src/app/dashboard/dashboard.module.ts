import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
//import { ChartistModule } from 'ng-chartist';
//import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbModule,
        MatchHeightModule,
        AngularResizedEventModule,
        FormsModule,
        NgxChartsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
        Dashboard2Component
    ],
    providers: [],
})
export class DashboardModule { }
