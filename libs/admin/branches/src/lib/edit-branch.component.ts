import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BranchesService, FeMessagesComponent, FeMessagesService} from "@bb/web/core";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzModalModule} from "ng-zorro-antd/modal";
import {BranchInListDto, EditBranchDto, EnumToArray, SystemUserRole} from '@bb/shared/dtos';
import {NzNotificationService } from 'ng-zorro-antd/notification';
import {DigitOnlyModule} from "@uiowa/digit-only";

@Component({
  selector: 'bb-edit-branch',
  standalone: true,
  imports: [CommonModule, FeMessagesComponent, FormsModule, NzFormModule, NzGridModule, NzInputModule, NzModalModule, ReactiveFormsModule, DigitOnlyModule],
  template: `
    <nz-modal
      (nzOnCancel)='onHide()'
      (nzOnOk)='update()'
      [nzClosable]='true'
      [nzOkDisabled]='form.invalid'
      [nzVisible]='show'
      nzOkText='Save Changes'
    >
      <div *nzModalTitle><span class='fe fe-edit'></span> Edit Branch Information</div>
      <div *nzModalContent>
        <bb-messages></bb-messages>
        <form [formGroup]="form"  nz-form nzLayout="vertical">
          <nz-form-item class="col-span-2">
            <nz-form-label nzRequired>Branch Name</nz-form-label>
            <nz-form-control>
              <input formControlName="name" nz-input type="text" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item class="col-span-2">
            <nz-form-label nzRequired>Phone Number</nz-form-label>
            <nz-form-control>
              <input formControlName="phoneNumber" nz-input type="text" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item class="col-span-2">
            <nz-form-label >Address</nz-form-label>
            <nz-form-control>
              <input formControlName="address" nz-input type="text" />
            </nz-form-control>
          </nz-form-item>
        </form>
      </div>
    </nz-modal>

  `,
  styles: [],
})
export class EditBranchComponent {
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
    private branchesService: BranchesService,
    private feMessages: FeMessagesService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder
  ) {

  }

  private _branch!: BranchInListDto;

  get branch(): BranchInListDto {
    return this._branch;
  }



  @Input()
  set branch(value: BranchInListDto) {
    if (value) {
      this._branch = value;
      this.form.get('name')?.setValue(value.name);
      this.form.get('phoneNumber')?.setValue(value.phone_number);
      this.form.get('address')?.setValue(value.address);
    }
  }


  onHide() {
    this.hide.emit(true);
    this.show = false;
  }

  update() {
    this.feMessages.emitError([]);
    const payload: EditBranchDto = {
      id: this.branch?.id,
      name: <string>this.form.get('name')?.value,
      phone_number: <string>this.form.get('phoneNumber')?.value,
      address: <string>this.form.get('address')?.value
    };

    this.branchesService.updateInfo(payload).subscribe(
      () => {
        this.branchesService.clearCache();
        this.branchesService.get().subscribe();
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
