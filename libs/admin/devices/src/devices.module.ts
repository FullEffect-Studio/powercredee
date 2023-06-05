import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {DevicesComponent} from "./devices/devices.component";

const routes: Route[] = [
  {
    path: '',
    component: DevicesComponent,
    data: { title: 'Devices' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

})
export class DevicesModule {}
