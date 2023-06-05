import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTypographyModule} from "ng-zorro-antd/typography";

@Component({
  selector: 'bb-driver-status',
  standalone: true,
    imports: [CommonModule, NzTagModule, NzTypographyModule],
  templateUrl: './driver-status.component.html',
  styleUrls: ['./driver-status.component.scss'],
})
export class DriverStatusComponent {}
