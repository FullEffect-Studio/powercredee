import { Injectable } from '@angular/core';
import { DriversInListDto } from '@bb/shared/dtos';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';


export type DriversState = EntityState<DriversInListDto>

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'drivers',
  idKey: 'id'
})
export class DriversStore extends EntityStore<DriversState> {

  constructor() {
    super();
  }

}
