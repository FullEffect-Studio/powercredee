import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DriversStore, DriversState } from './drivers.store';

@Injectable({ providedIn: 'root' })
export class DriversQuery extends QueryEntity<DriversState> {

  constructor(protected override store: DriversStore) {
    super(store);
  }

}
