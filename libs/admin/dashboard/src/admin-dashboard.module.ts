import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {InsightsComponent} from "./insights/insights.component";
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
      }
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
