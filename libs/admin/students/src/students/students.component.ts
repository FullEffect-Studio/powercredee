import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject, map} from 'rxjs';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";
import { DriversInListDto } from '@bb/shared/dtos';
import { AddDriverDto } from '@bb/shared/dtos';
import {HashMap} from "@datorama/akita";
import {DriversQuery, BusesQuery, BusesService, DriversService, FeMessagesService} from "@bb/web/core";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {DigitOnlyModule} from "@uiowa/digit-only";
import {NzInputModule} from "ng-zorro-antd/input";
import { FeMessagesComponent } from '@bb/web/core';
import {EditDriverInfoComponent} from "../edit-driver-info/edit-driver-info.component";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'bb-students',
  standalone: true,
  imports: [CommonModule, FeMessagesComponent, NzFormModule, NzSelectModule, NzDatePickerModule, NzPageHeaderModule, FormsModule, NzTableModule, NzDividerModule, ReactiveFormsModule, NzModalModule, DigitOnlyModule, NzInputModule, FeMessagesComponent, FeMessagesComponent, EditDriverInfoComponent, RouterLink],
  providers: [DriversService, DriversQuery],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    idCardNumber: ['', []],
    licenseType: ['', []],
    licenseNumber: ['', []],
    address: ['', []]
  });
  showAddModal = false;

  drivers$ = this.busesService.filter.selectAllByFilters().pipe(
    map(data => <HashMap<DriversInListDto>>data),
    map((drivers) => {
      const source = <any>drivers
      const data: DriversInListDto[] = [];
      for (const driversKey in source) {
        data.push(drivers[driversKey]);
      }
      return data;
    })
  );
  loading$ = this.busesQuery.selectLoading();
  showEditModal = false;
  selectedDriver$$ = new BehaviorSubject<DriversInListDto|null>(null);
  searchTerm = null;

  constructor(
    private formBuilder: FormBuilder,
    private busesService: BusesService,
    private busesQuery: BusesQuery,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private feMessageService: FeMessagesService
  ) {
  }

  ngOnInit(): void {
    this.busesService.get().subscribe();
  }

  addDriver() {
    this.feMessageService.emitError([]);

    const payload: AddDriverDto = {
      address: <string>this.form.get("address")?.value,
      licenseNumber: <string>this.form.get("licenseNumber")?.value,
      licenseType: <string>this.form.get("licenseType")?.value,
      name: <string>this.form.get("name")?.value,
      phoneNumber: <string>this.form.get("phoneNumber")?.value,
      idCardNumber: <string>this.form.get("idCardNumber")?.value,
    };

    this.busesService.add(payload).subscribe(
      () => {
        this.busesService.clearCache();
        this.busesService.get().subscribe();
        this.showAddModal = false;
        this.notification.success(
          "Added successfully",
          "A new driver has been registered"
        );
      },
      (err) => this.feMessageService.emitError(err.error.errorMessage)
    );
  }

  delete(data: DriversInListDto) {
    this.modalService.confirm({
      nzTitle: `Are you sure delete this ${data.name} - driver profile?`,
      nzContent:
        "<b style=\"color: red;\">The action is irreversible and will permanently remove the drivers profile the records? Select Yes to contine</b>",
      nzOkText: "Yes",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () =>
        this.busesService.delete(data.id).subscribe(
          () => {
            this.busesService.clearCache();
            this.busesService.get().subscribe();
            this.notification.success("Driver Profile has been deleted", "");
          },
          (err) => {
            this.notification.error(
              "Ops! Something went wrong",
              err.error.errorMessage
            );
          }
        ),
      nzCancelText: "No",
      nzOnCancel: () => console.log("Cancel")
    });
  }

  onSearchTermChange($event: any) {
    const searchTerm = $event.target.value;
    this.busesService.filter.setFilter({
      id: "name",
      value: searchTerm,
      predicate: (val, index, array) => val.name.toLowerCase().includes(searchTerm?.toLowerCase())
    });
  }
}
