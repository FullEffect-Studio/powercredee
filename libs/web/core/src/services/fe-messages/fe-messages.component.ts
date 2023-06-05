import { Observable } from 'rxjs'
import { FeMessagesService } from './fe-messages.service'
import { Component, Input, OnInit } from '@angular/core'
import {NzAlertModule} from "ng-zorro-antd/alert";
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  imports: [CommonModule, NzAlertModule],
  selector: 'bb-messages',
  templateUrl: './fe-messages.component.html',
  styleUrls: ['./fe-messages.component.scss']
})
export class FeMessagesComponent {
  errors$: Observable<string[]>
  @Input() closeable= true
  @Input() title = 'Some errors occurred: ';

  constructor(private feMessagesService: FeMessagesService) {
    this.errors$ =  this.feMessagesService.errors$
  }



  close(){
    this.feMessagesService.emitError([])
  }
}
