import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from '../components/stat/stat.component';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { webSocket, } from 'rxjs/webSocket';
import { BehaviorSubject } from "rxjs";
import { NzTagModule } from "ng-zorro-antd/tag";
import { environment } from "@bb/admin/common";
import { v4 } from "uuid";
import {BusStatusComponent} from "../components/bus-status/bus-status.component";
import {DriverStatusComponent} from "../components/driver-status/driver-status.component";
import {StudentsStatusComponent} from "../components/students-status/students-status.component";
import {AlertsWidgetComponent} from "../components/alerts-widget/alerts-widget.component";
import {DepositWithdrawalAnalyticsComponent} from "../components/on-time-performace/deposit-withdrawal-analytics.component";
import {FuelConsumptionComponent} from "../components/fuel-consumption/fuel-consumption.component";
import {ExpensesOverviewComponent} from "../components/bus-maintenance-cost/expenses-overview.component";
import {StudentsStatusByBusComponent} from "../components/students-status-by-bus/students-status-by-bus.component";



@Component({
  selector: 'bb-insights',
  standalone: true,
  imports: [
    CommonModule,
    StatComponent,
    HighchartsChartModule,
    NzTableModule,
    NzTypographyModule,
    NzCardModule,
    NzButtonModule,
    NzTagModule,
    BusStatusComponent,
    DriverStatusComponent,
    StudentsStatusComponent,
    AlertsWidgetComponent,
    DepositWithdrawalAnalyticsComponent,
    FuelConsumptionComponent,
    ExpensesOverviewComponent,
    StudentsStatusByBusComponent,
  ],
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss'],
})
export class InsightsComponent implements OnInit {
  data = [1, 2, 3, 4, 5];
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Browser market shares in May, 2020',
      align: 'left',
    },
    series: [
      {
        pointInterval: 24 * 3600 * 1000,
        data: this.data,
        type: 'line',
      },
    ],
  }; // required
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = false; // optional boolean, defaults to false


  exchangeInfoSocket = webSocket(environment.binance.websocketUrl);
  numberOfBinanceTradingPairs$ = new BehaviorSubject<number>(0)

  ngOnInit(): void {

    console.log()
  }

  chartCallback: Highcharts.ChartCallbackFunction = function (chart) {
    // console.log(chart)
  }; // optional function, defaults to null

  handleUpdate() {
    // this.chartOptions.title = {
    //   text: 'updated',
    // };
    //
    // this.chartOptions.series[0] = {
    //   type: 'line',
    //   data: this.data.reverse(),
    // };
    //
    // this.updateFlag = true;
  }
}
