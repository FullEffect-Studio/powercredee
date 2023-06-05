import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzTableModule} from "ng-zorro-antd/table";

@Component({
  selector: 'bb-students-status-by-bus',
  standalone: true,
  imports: [CommonModule, NzTagModule, NzTypographyModule, NzTableModule],
  templateUrl: './students-status-by-bus.component.html',
  styleUrls: ['./students-status-by-bus.component.scss'],
})
export class StudentsStatusByBusComponent {}
