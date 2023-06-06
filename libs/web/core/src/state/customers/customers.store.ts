import { Injectable } from '@angular/core';
import { BranchInListDto } from '@bb/shared/dtos';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import {Customer} from "./customer.model";


export type CustomersState = EntityState<Customer>

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'customers',
  idKey: 'id'
})
export class CustomersStore extends EntityStore<CustomersState> {

  constructor() {
    super();
  }

}
