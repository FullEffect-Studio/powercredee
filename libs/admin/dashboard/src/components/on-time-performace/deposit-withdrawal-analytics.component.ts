import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import {HighchartsChartModule} from "highcharts-angular";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
HC_exporting(Highcharts);

@Component({
  selector: 'bb-deposit-withdrawal-analytics',
  standalone: true,
  imports: [CommonModule, NzTagModule, NzTypographyModule, HighchartsChartModule, NzSelectModule, FormsModule],
  templateUrl: './deposit-withdrawal-analytics.component.html',
  styleUrls: ['./deposit-withdrawal-analytics.component.scss'],
})
export class DepositWithdrawalAnalyticsComponent implements OnInit{


  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'chart';
  updateFlag = true;
  oneToOneFlag = true;
  runOutsideAngular = false;

  chartOptions: Highcharts.Options = {

    chart: {
      type: 'line',
      panning: {
        enabled: true, type:'xy'
      },
      panKey: 'shift'
    },
    boost: {
      useGPUTranslations: true
    },
    title: {
      text: 'Deposit & Withdrawal Analytics',
    },
    // subtitle: {
    //   text: 'Measures the percentage of buses that arrive at their destination on time.'
    // },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Daily Transaction Volumes',
      },
      min: 0,
      max: 100000,
    },
    tooltip: {
      headerFormat: '<b>{point.x:%Y-%m-%d}</b><br>',
      pointFormat: '',
    },

    series: [
      {
        name: 'Deposits',
        data: this.prepareData(),
        type: 'line',
      },
      {
        name: 'Withdrawals',
        data: this.prepareData(),
        type: 'line',
      },
    ],
  }


  ngOnInit(): void {
    // exporting(Highcharts);
    // HC_exportData(Highcharts);
    // HC_drilldown(Highcharts);
  }

  getOnTimePerformanceData(): void {
    // this.apiService.getOnTimePerformanceData().subscribe(
    //   (data: any[]) => {
    //     this.onTimePerformanceData = data.map(d => ({
    //       x: new Date(d.date).getTime(),
    //       y: d.percentage
    //     }));
    //     this.chart.series[0].setData(this.onTimePerformanceData);
    //   },
    //   error => console.log(error)
    // );
  }


  prepareData(): any[] {
    // Fetch on-time performance data from backend API
    const data = [
      {
        date: new Date(2023, 2, 1 ),
        onTimePercentage: Math.floor(Math.random() * 101) + 50
      },
      {
        date: new Date(2023, 2, 2 ),
        onTimePercentage: Math.floor(Math.random() * 101) + 50
      },
      {
        date: new Date(2023, 2, 3 ),
        onTimePercentage: Math.floor(Math.random() * 101) + 50
      },
      {
        date: new Date(2023, 2, 4 ),
        onTimePercentage: Math.floor(Math.random() * 101) + 50
      },
      {
        date: new Date(2023, 2, 5 ),
        onTimePercentage: Math.floor(Math.random() * 101) + 50
      },
      {
        date: new Date(2023, 2, 6 ),
        onTimePercentage: Math.floor(Math.random() * 101) + 50
      },
      {
        date: new Date(2023, 2, 7 ),
        onTimePercentage: Math.floor(Math.random() * 101) + 50
      }
    ];

    // Prepare data for Highcharts
    const preparedData = data.map((d) => ({
      x: new Date(d.date).getTime(), // Convert date string to milliseconds
      y: d.onTimePercentage,
    }));

    return preparedData;
  }


  chartCallback: Highcharts.ChartCallbackFunction = function (chart) {
    console.log(chart)
  }; // optional function, defaults to null

  handleUpdate() {
    this.chartOptions.title = {
      text: 'updated',
    };

    // this.chartOptions.series[0] = {
    //   type: 'line',
    //   data: this.data.reverse(),
    // };

    this.updateFlag = true;
  }

}
