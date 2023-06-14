import { Component } from '@angular/core';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";

@Component({
  selector: 'pc-register-customer',
  standalone: true,
  template: `
    <div  class="pt-4 pl-4  rounded-lg ">
      <div class="container mx-auto bg-white ">
        <nz-page-header [nzTitle]="titleTpl" class="site-page-header">
          <ng-template #titleTpl>
          </ng-template>

          <nz-page-header-extra>
            <div class="flex items-center space-x-2">
              <button class="btn btn-md btn-primary"><span class="fe fe-plus"></span>
                Save
              </button>

            </div>
          </nz-page-header-extra>
        </nz-page-header>

        <section  class="px-8 mx-auto">

        </section>
      </div>


    </div>
  `,
  styles: [],
  imports: [
    NzPageHeaderModule
  ]
})
export class RegisterCustomerComponent {}
