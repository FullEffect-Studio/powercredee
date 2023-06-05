import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import {DriverDetailComponent} from "./driver-detail/driver-detail.component";

const routes: Route[] = [
  {
    path: '',
    component: DriversListComponent,
    data: { title: 'Drivers' },
  },
  {
    path: ':id',
    component: DriverDetailComponent,
    data: { title: 'Drivers' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

})
export class AdminDriversModule {}
