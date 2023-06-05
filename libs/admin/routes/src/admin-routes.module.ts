import {NgModule} from '@angular/core';
import {Route, RouterLink, RouterModule} from '@angular/router';
import {StopsListComponent} from './stops-list/stops-list.component';
import {CommonModule} from '@angular/common';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzListModule} from 'ng-zorro-antd/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzSliderModule} from 'ng-zorro-antd/slider';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzTableModule} from 'ng-zorro-antd/table';
import {AvatarModule} from 'ngx-avatar';
import {NzInputModule} from 'ng-zorro-antd/input';
import {AddStopComponent} from './add-stop/add-stop.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {EditStopComponent} from "./edit-place/edit-stop.component";
import {PreviewLocationComponent} from "./preview-location/preview-location.component";


const routes: Route[] = [
  {
    path: 'routing',
    pathMatch: 'full',
    redirectTo: '/routing/stops',
  },
  {
    path: 'stops',
    component: StopsListComponent,
    data: { title: 'Stops' },
  },
];

@NgModule({
  declarations: [StopsListComponent, AddStopComponent, EditStopComponent, PreviewLocationComponent],
  imports: [
    CommonModule,
    NzDividerModule,
    NzListModule,
    FormsModule,
    NzSpinModule,
    NzSkeletonModule,
    NzDrawerModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzRadioModule,
    NzSliderModule,
    NzPageHeaderModule,
    NzTagModule,
    NzDropDownModule,
    NzTableModule,
    RouterLink,
    AvatarModule,
    RouterModule.forChild(routes),
    NzInputModule,
    GoogleMapsModule,
    GooglePlaceModule
  ],
})
export class AdminRoutesModule {}
