import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BehaviorSubject, map} from "rxjs";
import {HashMap} from "@datorama/akita";
import {AddBranchDto, BranchInListDto} from "@bb/shared/dtos";
import {BranchesQuery, BranchesService, FeMessagesComponent, FeMessagesService} from "@bb/web/core";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {EditBranchComponent} from "../edit-branch.component";

@Component({
  selector: 'bb-manage-branches',
  standalone: true,
  imports: [CommonModule, NzPageHeaderModule, NzTableModule, NzDividerModule, FeMessagesComponent, NzFormModule, NzModalModule, ReactiveFormsModule, NzInputModule, FormsModule, EditBranchComponent],
  templateUrl: './manage-branches.component.html',
  styleUrls: ['./manage-branches.component.scss'],
})
export class ManageBranchesComponent {
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    address: ['', []]
  });
  showAddModal = false;

  branches$ = this.branchesService.filter.selectAllByFilters().pipe(
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
