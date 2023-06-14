import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BranchesQuery,
  BranchesService,
  CustomersQuery,
  CustomersService,
  FeMessagesComponent,
  FeMessagesService
} from "@bb/web/core";
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
import {EmptyComponent} from "@bb/web/shared";
import {Customer} from "@bb/web/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'pc-customers',
  standalone: true,
  imports: [CommonModule, FeMessagesComponent, NzDividerModule, NzFormModule, NzGridModule, NzInputModule, NzModalModule, NzPageHeaderModule, NzTableModule, ReactiveFormsModule, FormsModule, EmptyComponent, RouterLink],
  template: `
    <div *ngIf="customers$ | async as drivers" class="pt-4 pl-4  rounded-lg ">
      <div class="container mx-auto bg-white ">
        <nz-page-header [nzTitle]="titleTpl" class="site-page-header">
          <ng-template #titleTpl>
          </ng-template>

          <nz-page-header-extra>
            <div class="flex items-center space-x-2">
              <input (keyup)="onSearchTermChange($event)" [(ngModel)]="searchTerm"
                     class="input input-md input-bordered placeholder-neutral/25"
                     placeholder="Search by name" type="search">
              <button routerLink="/customers/register" class="btn btn-md btn-primary"><span class="fe fe-plus"></span> New
                Customer
              </button>
              <button (click)="showAddModal=true" class="btn btn-md btn-secondary">
                <span class="fe fe-download mr-1"></span> Bulk Import
              </button>
            </div>
          </nz-page-header-extra>
        </nz-page-header>
        <bb-empty [show]="!drivers.length"
                  imageUrl="assets/customers.png"
                  collectionName="Customer"
                  title="No Customer has been registred yet"
                  description="Setup and manage your company branches here"
                  [searchTerm]="searchTerm"></bb-empty>

        <section *ngIf="drivers.length" class="px-8 mx-auto">
          <nz-table [nzData]="drivers" nzBordered [nzLoading]="loading$ | async">
            <thead>
            <tr>
              <th>Photo</th>
              <th>Customer No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <ng-container *ngFor="let data of drivers">
              <tr class="cursor-pointerx hover:bg-gray-300x">
                <td><img [width]="36" [height]="36"  src="assets/customer_avatar.png" alt="Customer Photo"></td>
                <td>{{ data.member_no }}</td>
                <td>{{ data.first_name }} {{data.last_name}}</td>
                <td>{{ data.email }}</td>
                <td>{{data.branch_id}}</td>
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

  customers$ = this.customersService.filter.selectAllByFilters().pipe(
    map(data => <HashMap<Customer>>data),
    map((customers) => {
      const source = <any>customers
      const data: Customer[] = [];
      for (const driversKey in source) {
        data.push(customers[driversKey]);
      }
      return data;
    })
  );
  loading$ = this.customersQuery.selectLoading();
  showEditModal = false;
  selectedBranch$$ = new BehaviorSubject<BranchInListDto|null>(null);
  searchTerm = null;

  constructor(
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private customersQuery: CustomersQuery,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private feMessageService: FeMessagesService
  ) {
  }

  ngOnInit(): void {
    this.customersService.get().subscribe();
  }

  addDriver() {
    this.feMessageService.emitError([]);

    const payload: AddBranchDto = {
      address: <string>this.form.get("address")?.value,
      name: <string>this.form.get("name")?.value,
      phone_number: <string>this.form.get("phoneNumber")?.value,
    };

    this.customersService.add(payload).subscribe(
      () => {
        this.customersService.clearCache();
        this.customersService.get().subscribe();
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
        this.customersService.delete(data.id).subscribe(
          () => {
            this.customersService.clearCache();
            this.customersService.get().subscribe();
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
    this.customersService.filter.setFilter({
      id: "name",
      value: searchTerm,
      predicate: (val) => `${val.first_name}${val.last_name}`.toLowerCase().includes(searchTerm?.toLowerCase())
    });
  }
}
