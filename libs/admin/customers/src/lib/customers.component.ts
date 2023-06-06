import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditBranchComponent} from "../../../branches/src/lib/edit-branch.component";
import {BranchesQuery, BranchesService, FeMessagesComponent, FeMessagesService} from "@bb/web/core";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BehaviorSubject, map} from "rxjs";
import {HashMap} from "@datorama/akita";
import {AddBranchDto, BranchInListDto} from "@bb/shared/dtos";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'pc-customers',
  standalone: true,
  imports: [CommonModule, EditBranchComponent, FeMessagesComponent, NzDividerModule, NzFormModule, NzGridModule, NzInputModule, NzModalModule, NzPageHeaderModule, NzTableModule, ReactiveFormsModule, FormsModule],
  template: `
    <div *ngIf="customers$ | async as drivers" class="pt-4 pl-4  rounded-lg shadow-lg">
      <div class="container mx-auto bg-white ">
        <nz-page-header [nzTitle]="titleTpl" class="site-page-header">
          <ng-template #titleTpl>
          </ng-template>

          <nz-page-header-extra>
            <div class="flex items-center space-x-2">
              <input *ngIf="false" (keyup)="onSearchTermChange($event)" [(ngModel)]="searchTerm"
                     class="input input-md input-bordered placeholder-neutral/25"
                     placeholder="Search by name" type="search">
              <button (click)="showAddModal=true" class="btn btn-md btn-primary"><span class="fe fe-plus"></span> New
                Branch
              </button>
            </div>
          </nz-page-header-extra>
        </nz-page-header>
        <section
          *ngIf="!drivers.length"
          class="max-w-lg px-4 py-12 lg:py-20 mx-auto"
        >
          <img class="mx-auto sm:w-2/5" src="assets/branches.png" alt="Branches image"/>

          <h2 *ngIf="searchTerm else emptyListTitle" class="mt-8 text-xl font-medium text-center text-gray-800">
            No match found
          </h2>
          <ng-template #emptyListTitle>
            <h2 class="mt-8 text-xl font-medium text-center text-gray-800">
              No Branches have been setup yet
            </h2>
          </ng-template>

          <p *ngIf="searchTerm else emptyListDescription" class="mt-4 text-center text-gray-600">
            No driver name contains <span class="font-bold">"{{searchTerm}}"</span>
          </p>
          <ng-template #emptyListDescription>
            <p class="mt-4 text-center text-gray-600">
              <span>Setup and manage your company branches here</span>
            </p>
          </ng-template>
        </section>

        <section *ngIf="drivers.length" class="px-8 mx-auto">
          <nz-table [nzData]="drivers" [nzLoading]="loading$ | async">
            <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <ng-container *ngFor="let data of drivers">
              <tr class="cursor-pointerx hover:bg-gray-300x">
                <td>{{ data.name }}</td>
                <td>{{ data.phone_number }}</td>
                <td>{{ data.address }}</td>
                <td>
                  <a (click)="showEditModal = true; selectedBranch$$.next(data)"><span class="fe fe-edit"></span>
                    Edit</a>
                  <nz-divider nzType="vertical"></nz-divider>
                  <a (click)="delete(data)"><span class="fe fe-delete"></span> Delete</a>
                </td>
              </tr>
            </ng-container>
            </tbody>
          </nz-table>
        </section>
      </div>

      <nz-modal
        (nzOnCancel)="showAddModal = false"
        (nzOnOk)="addDriver()"
        [nzClosable]="true"
        [nzOkDisabled]="form.invalid"
        [nzVisible]="showAddModal"
        nzOkText="Add Driver"
      >
        <div *nzModalTitle><span class="fe fe-plus"></span> Add New Company Branch</div>
        <div *nzModalContent>
          <bb-messages></bb-messages>
          <form [formGroup]="form" nz-form nzLayout="vertical">
            <nz-form-item class="col-span-2">
              <nz-form-label nzRequired>Branch Name</nz-form-label>
              <nz-form-control>
                <input formControlName="name" nz-input type="text"/>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item class="col-span-2">
              <nz-form-label nzRequired>Phone Number</nz-form-label>
              <nz-form-control>
                <input formControlName="phoneNumber" nz-input type="text"/>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item class="col-span-2">
              <nz-form-label>Address</nz-form-label>
              <nz-form-control>
                <input formControlName="address" nz-input type="text"/>
              </nz-form-control>
            </nz-form-item>
          </form>
        </div>
      </nz-modal>


<!--      <bb-edit-branch [show]="showEditModal" (hide)="showEditModal = false"-->
<!--                      [branch]="selectedBranch$$|async"></bb-edit-branch>-->

    </div>
  `,
  styles: [],
})
export class CustomersComponent {
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    address: ['', []]
  });
  showAddModal = false;

  customers$ = this.branchesService.filter.selectAllByFilters().pipe(
    map(data => <HashMap<BranchInListDto>>data),
    map((drivers) => {
      const source = <any>drivers
      const data: BranchInListDto[] = [];
      for (const driversKey in source) {
        data.push(drivers[driversKey]);
      }
      return data;
    })
  );
  loading$ = this.busesQuery.selectLoading();
  showEditModal = false;
  selectedBranch$$ = new BehaviorSubject<BranchInListDto|null>(null);
  searchTerm = null;

  constructor(
    private formBuilder: FormBuilder,
    private branchesService: BranchesService,
    private busesQuery: BranchesQuery,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private feMessageService: FeMessagesService
  ) {
  }

  ngOnInit(): void {
    this.branchesService.get().subscribe();
  }

  addDriver() {
    this.feMessageService.emitError([]);

    const payload: AddBranchDto = {
      address: <string>this.form.get("address")?.value,
      name: <string>this.form.get("name")?.value,
      phone_number: <string>this.form.get("phoneNumber")?.value,
    };

    this.branchesService.add(payload).subscribe(
      () => {
        this.branchesService.clearCache();
        this.branchesService.get().subscribe();
        this.showAddModal = false;
        this.notification.success(
          "Added successfully",
          "A new branch has been setup"
        );
      },
      (err) => this.feMessageService.emitError(err.error.errorMessage)
    );
  }

  delete(data: BranchInListDto) {
    this.modalService.confirm({
      nzTitle: `Are you sure delete branch with name  ${data.name}`,
      nzContent:
        "<b style=\"color: red;\">The action is irreversible and will permanently remove the branch the records? Select Yes to continue</b>",
      nzOkText: "Yes",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () =>
        this.branchesService.delete(data.id).subscribe(
          () => {
            this.branchesService.clearCache();
            this.branchesService.get().subscribe();
            this.notification.success("Branch has been deleted permanently", "");
          },
          (err) => {
            this.notification.error(
              "Ops! Something went wrong",
              err.error.detail
            );
          }
        ),
      nzCancelText: "No",
      nzOnCancel: () => console.log("Cancel")
    });
  }

  onSearchTermChange($event: any) {
    const searchTerm = $event.target.value;
    this.branchesService.filter.setFilter({
      id: "name",
      value: searchTerm,
      predicate: (val, index, array) => val.name.toLowerCase().includes(searchTerm?.toLowerCase())
    });
  }
}
