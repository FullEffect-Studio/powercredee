import { Injectable } from '@angular/core';
import { BranchInListDto } from '@bb/shared/dtos';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';


export type BranchState = EntityState<BranchInListDto>

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'branches',
  idKey: 'id'
})
export class BranchesStore extends EntityStore<BranchState> {

  constructor() {
    super();
  }

}
