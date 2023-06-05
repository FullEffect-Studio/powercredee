import { RouterModule } from '@angular/router';
import { AfterViewInit, Component } from '@angular/core';
import { WorkspaceComponent } from "@bb/admin/core";
import * as feather from 'feather-icons'
import {NgProgressModule} from "ngx-progressbar";


@Component({
  standalone: true,
  imports: [RouterModule, WorkspaceComponent, NgProgressModule, WorkspaceComponent],
  selector: 'bb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit{
  title = 'web-admin';
  ngAfterViewInit() {
    feather.replace();
  }
}
