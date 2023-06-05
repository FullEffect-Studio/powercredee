import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTypographyModule} from "ng-zorro-antd/typography";

@Component({
  selector: 'bb-students-status',
  standalone: true,
    imports: [CommonModule, NzTagModule, NzTypographyModule],
  templateUrl: './students-status.component.html',
  styleUrls: ['./students-status.component.scss'],
})
export class StudentsStatusComponent {}
