import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {ChartModule, ChartsModule, StockChartModule} from '@progress/kendo-angular-charts';

import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    StockChartModule,
    ChartModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
