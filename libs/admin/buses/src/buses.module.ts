import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {BusesListComponent} from "./buses-list/buses-list.component";

const routes: Route[] = [
  {
    path: '',
    component: BusesListComponent,
    data: { title: 'Buses' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

})
export class BusesModule {}
