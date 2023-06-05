import {RouterModule} from '@angular/router';
import {Component} from '@angular/core';
import {SimulatorComponent} from "./simulator/simulator.component";

@Component({
  standalone: true,
  imports: [RouterModule, SimulatorComponent],
  selector: 'bb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gps';
}
