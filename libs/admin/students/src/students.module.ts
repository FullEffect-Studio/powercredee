import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {StudentsComponent} from "./students/students.component";

const routes: Route[] = [
  {
    path: '',
    component: StudentsComponent,
    data: { title: 'Students' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

})
export class StudentsModule {}
