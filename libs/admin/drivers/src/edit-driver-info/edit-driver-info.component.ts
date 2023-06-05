import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DriversInListDto, EditDriverDto, EnumToArray, SystemUserRole } from '@bb/shared/dtos';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonModule } from '@angular/common';
import { DriversService, FeMessagesService } from '@bb/web/core';
import {NzModalModule} from "ng-zorro-antd/modal";
import {FeMessagesComponent} from "../../../../web/core/src";
import {NzFormModule} from "ng-zorro-antd/form";
import {DigitOnlyModule} from "@uiowa/digit-only";
import {NzInputModule} from "ng-zorro-antd/input";

@Component({
  standalone: true,
  imports: [CommonModule, NzModalModule, ReactiveFormsModule, FeMessagesComponent, NzFormModule, DigitOnlyModule, NzInputModule],
  selector: 'bb-edit-driver-info',
  templateUrl: './edit-driver-info.component.html',
  styleUrls: ['./edit-driver-info.component.scss']
})
export class EditDriverInfoComponent {
  @Input()
  show = false;
  @Output()
  hide = new EventEmitter(true);
  rolesList = EnumToArray(SystemUserRole);
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    address: ['', [Validators.required]]
  });

  constructor(
    private driversService: DriversService,
    private feMessages: FeMessagesService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder
  ) {
  }

  private _driver!: DriversInListDto;

  get driver(): DriversInListDto {
    return this._driver;
  }



  @Input()
  set driver(value: DriversInListDto) {
    if (value) {
      this._driver = value;
      this.form.get('name')?.setValue(value.name);
      this.form.get('phoneNumber')?.setValue(value.phoneNumber);
      this.form.get('address')?.setValue(value.address);
    }
  }


  onHide() {
    this.hide.emit(true);
    this.show = false;
  }

  update() {
    this.feMessages.emitError([]);
    const payload: EditDriverDto = {
      id: this.driver?.id,
      name: <string>this.form.get('name')?.value,
      phoneNumber: <string>this.form.get('phoneNumber')?.value,
      address: <string>this.form.get('address')?.value
    };

    this.driversService.updateInfo(payload).subscribe(
      () => {
        this.driversService.clearCache();
        this.driversService.get().subscribe();
        this.form.reset();
        this.notification.success('Changes saved', '');
        this.hide.emit();
      },
      (err) => {
        this.feMessages.emitError(err.error.errorMessage);
        this.notification.error(
          'Ops! something went wrong',
          err.error.errorMessage
        );
      }
    );
  }
}
