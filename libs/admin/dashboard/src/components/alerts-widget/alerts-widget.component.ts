import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTypographyModule} from "ng-zorro-antd/typography";

@Component({
  selector: 'bb-alerts-widget',
  standalone: true,
    imports: [CommonModule, NzTagModule, NzTypographyModule],
  templateUrl: './alerts-widget.component.html',
  styleUrls: ['./alerts-widget.component.scss'],
})
export class AlertsWidgetComponent {}
