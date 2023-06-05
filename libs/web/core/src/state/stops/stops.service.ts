import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {switchMap, tap} from 'rxjs/operators';
import {StopsState, StopsStore} from './stops.store';
import {AkitaFiltersPlugin} from "akita-filters-plugin";
import {environment} from '@bb/admin/common';
import {StopsQuery} from "./stops.query";
import {BehaviorSubject, EMPTY} from "rxjs";
import {AddStopDto, StopDto, UpdateStopDto} from '@bb/shared/dtos';
import {ID} from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class StopsService {

  apiBase
  filter
  next$ = new BehaviorSubject<StopDto|null>(null);
  prev$ = new BehaviorSubject<StopDto|null>(null);

  constructor(private stopsStore: StopsStore,
              private query: StopsQuery,
              private http: HttpClient) {
    this.apiBase = `${environment.server.baseUrl}/api/stops`;
    this.filter = new AkitaFiltersPlugin<StopsState>(this.query);
    this.prev$.subscribe();
    this.next$.subscribe();
  }




  get() {
    const request = this.http.get<StopDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.stopsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(
      switchMap((hasCache) => {
        return hasCache ? EMPTY : request;
      })
    );
  }

  add(payload: AddStopDto) {
    return this.http.post(this.apiBase, payload);
  }

  editTerminal(payload: UpdateStopDto) {
    return this.http.patch(`${this.apiBase}/${payload.placeGeoId}`, payload);
  }

  delete(id: ID) {
    return this.http.delete(`${this.apiBase}/${id}`);
  }

  clearCache() {
    this.stopsStore.setHasCache(false, { restartTTL: true });
  }

  getById(id: string) {
    return this.http
      .get<StopDto>(`${this.apiBase}/${id}`)
      .pipe(tap((entity) => this.stopsStore.update(entity.id, entity)));
  }

  setActive(id: string) {
    this.stopsStore.setActive(id);
    const selected = this.query.getEntity(id);
    if(!selected){return;}

    const items = this.query.getAll();
    const indexOfSelected = items.indexOf(selected);

    const nextItem = items[indexOfSelected + 1];
    if (nextItem) {
      this.next$.next(nextItem);
    } else {
      this.next$.next(null);
    }
    console.log('Next Bus stop', nextItem);

    const prevItem = items[indexOfSelected - 1];
    if (prevItem) {
      this.prev$.next(prevItem);
    } else {
      this.prev$.next(null);
    }

    console.log('Prev Bus stop', prevItem);
  }




}
