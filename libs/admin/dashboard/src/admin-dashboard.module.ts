import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {InsightsComponent} from "./insights/insights.component";
import {MonitorComponent} from "./monitor/monitor.component";
import {SafetyComponent} from "./safety/safety.component";
import {GoogleMapsModule} from "@angular/google-maps";

const routes: Route[] = [
  {
    path: '',
    redirectTo: '/dashboard/insights',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    children: [
      {
        path: 'insights',
        component: InsightsComponent,
        data: { title: 'Key Insights' },
      },
      {
        path: 'monitor',
        component: MonitorComponent,
        data: { title: 'Monitor' },
      },
      {
        path: 'safety',
        component: SafetyComponent,
        data: { title: 'Driver Safety' },
      },
    ]
  },

]

@NgModule({
  imports:[
    RouterModule.forChild(routes),
    GoogleMapsModule
  ]
})
export class AdminDashboardModule {

}
