import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BranchesStore, BranchState } from './branches.store';

@Injectable({ providedIn: 'root' })
export class BranchesQuery extends QueryEntity<BranchState> {

  constructor(protected override store: BranchesStore) {
    super(store);
  }

}
