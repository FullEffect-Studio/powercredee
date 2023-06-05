import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTypographyModule} from "ng-zorro-antd/typography";

@Component({
  selector: 'bb-bus-status',
  standalone: true,
  imports: [CommonModule, NzTagModule, NzTypographyModule],
  templateUrl: './bus-status.component.html',
  styleUrls: ['./bus-status.component.scss'],
})
export class BusStatusComponent {}
