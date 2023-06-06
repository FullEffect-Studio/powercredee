import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CustomersStore, CustomersState } from './customers.store';

@Injectable({ providedIn: 'root' })
export class CustomersQuery extends QueryEntity<CustomersState> {

  constructor(protected override store: CustomersStore) {
    super(store);
  }

}
