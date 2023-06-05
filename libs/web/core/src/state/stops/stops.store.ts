import {Injectable} from '@angular/core';
import {StopDto} from '@bb/shared/dtos';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';


export type StopsState = EntityState<StopDto>

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'stops',
  idKey: 'id'
})
export class StopsStore extends EntityStore<StopsState> {

  constructor() {
    super();
  }

}
