import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BusesStore, BusState } from './buses.store';

@Injectable({ providedIn: 'root' })
export class BusesQuery extends QueryEntity<BusState> {

  constructor(protected override store: BusesStore) {
    super(store);
  }

}
