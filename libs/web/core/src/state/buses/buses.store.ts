import { Injectable } from '@angular/core';
import { DriversInListDto } from '@bb/shared/dtos';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';


export type BusState = EntityState<DriversInListDto>

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'drivers',
  idKey: 'id'
})
export class BusesStore extends EntityStore<BusState> {

  constructor() {
    super();
  }

}
