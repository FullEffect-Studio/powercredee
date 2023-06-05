import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StopsStore, StopsState } from './stops.store';

@Injectable({ providedIn: 'root' })
export class StopsQuery extends QueryEntity<StopsState> {

  constructor(protected override store: StopsStore) {
    super(store);
  }

}
