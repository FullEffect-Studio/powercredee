import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzTableModule} from "ng-zorro-antd/table";

@Component({
  selector: 'bb-recent-transactions',
  standalone: true,
  imports: [CommonModule, NzTagModule, NzTypographyModule, NzTableModule],
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss'],
})
export class RecentTransactionsComponent {}
