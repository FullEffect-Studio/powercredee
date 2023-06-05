import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import {HighchartsChartModule} from "highcharts-angular";
import {NzSelectModule} from "ng-zorro-antd/select";

@Component({
  selector: 'bb-fuel-consumption',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule, NzSelectModule],
  templateUrl: './fuel-consumption.component.html',
  styleUrls: ['./fuel-consumption.component.scss'],
})
export class FuelConsumptionComponent {


  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'chart';
  updateFlag = true;
  oneToOneFlag = true;
  runOutsideAngular = false;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Monthly fuel consumption by bus'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', /*'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'*/],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Fuel consumption (liters)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} liters</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: 'Bus 1',
        data: this.calculateMonthlyFuelConsumption('Bus 1'),
        type: 'column'
      },
      {
        name: 'Bus 2',
        data: this.calculateMonthlyFuelConsumption('Bus 2'),
        type: 'column'
      },
      {
        name: 'Bus 3',
        data: this.calculateMonthlyFuelConsumption('Bus 3'),
        type: 'column'
      }
      // add more series for each bus as needed
    ]
  }





  calculateMonthlyFuelConsumption(busName: string) {
    const fuelConsumptionData = [
      { bus: 'Bus 1', date: new Date('2023-01-01'), fuelConsumed: 200 },
      { bus: 'Bus 1', date: new Date('2023-02-01'), fuelConsumed: 250 },
      { bus: 'Bus 1', date: new Date('2023-03-01'), fuelConsumed: 300 },
      { bus: 'Bus 2', date: new Date('2023-01-01'), fuelConsumed: 150 },
      { bus: 'Bus 2', date: new Date('2023-02-01'), fuelConsumed: 200 },
      { bus: 'Bus 2', date: new Date('2023-03-01'), fuelConsumed: 250 },
      { bus: 'Bus 3', date: new Date('2023-01-01'), fuelConsumed: 100 },
      { bus: 'Bus 3', date: new Date('2023-02-01'), fuelConsumed: 150 },
      { bus: 'Bus 3', date: new Date('2023-03-01'), fuelConsumed: 200 }
    ];

    const monthlyFuelConsumption = [];
    for (let i = 0; i < 6; i++) { // assuming 12 months in a year
      const monthFuelConsumption = fuelConsumptionData.filter(data => data.bus === busName && data.date.getMonth() === i)
        .reduce((total, data) => total + data.fuelConsumed, 0);
      monthlyFuelConsumption.push(monthFuelConsumption);
    }
    return monthlyFuelConsumption;
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
