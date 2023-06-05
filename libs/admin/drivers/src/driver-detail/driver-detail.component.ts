import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";

@Component({
  selector: 'bb-driver-detail',
  standalone: true,
  imports: [CommonModule, NzPageHeaderModule, NzTableModule, NzDescriptionsModule],
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss'],
})
export class DriverDetailComponent {}
