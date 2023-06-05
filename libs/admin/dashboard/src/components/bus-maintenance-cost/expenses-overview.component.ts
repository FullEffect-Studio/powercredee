import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'bb-expenses-overview',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './expenses-overview.component.html',
  styleUrls: ['./expenses-overview.component.css'],
})
export class ExpensesOverviewComponent {
  data = [1, 2, 3, 4, 5];
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Expenses Overview',
      align: 'center',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>GHc {point.y:.2f}</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Maintenance Cost',
        type: 'pie',
        colorByPoint: true,
        data: [
          {
            name: 'Internet Bill',
            y: 1035,
          },
          {
            name: 'Electricity',
            y: 2350,
          },
          {
            name: 'Food',
            y: 426,
          },
          {
            name: 'Transport',
            y: 1359,
          },
        ],
      },
    ],
  };
  updateFlag = false; // optional boolean
  oneToOneFlag = true;
  runOutsideAngular = false;

  chartCallback: Highcharts.ChartCallbackFunction = function (chart) {
    console.log(chart);
  }; // optional function, defaults to null

  handleUpdate() {
    this.chartOptions.title = {
      text: 'updated',
    };

    this.chartOptions.series[0] = {
      type: 'line',
      data: this.data.reverse(),
    };

    this.updateFlag = true;
  }
}
