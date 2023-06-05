import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import {NgProgressModule} from "ngx-progressbar";
import {WorkspaceComponent} from "@bb/admin/core";

@Component({
  standalone: true,
  imports: [RouterModule, WorkspaceComponent, NgProgressModule, WorkspaceComponent],
  selector: 'pc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
}
