import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {switchMap, tap } from 'rxjs/operators';
import {BusState, BusesStore} from './buses.store';
import {AkitaFiltersPlugin} from "akita-filters-plugin";
import {BusesQuery} from "./buses.query";
import {environment} from "@bb/admin/common";
import {AddDriverDto, DriversInListDto, EditDriverDto } from '@bb/shared/dtos';
import {EMPTY} from "rxjs";

@Injectable({ providedIn: 'root' })
export class BusesService {

  apiBase
  filter
  constructor(private driversStore: BusesStore,
              private query: BusesQuery,
              private http: HttpClient) {
    this.apiBase = `${environment.server.baseUrl}/api/buses`;
    this.filter = new AkitaFiltersPlugin<BusState>(this.query);
  }


  get() {
    const request = this.http.get<DriversInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.driversStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(
      switchMap((hasCache) => {
        return hasCache ? EMPTY : request;
      })
    );
  }


  add(payload: AddDriverDto) {
    return this.http.post(this.apiBase, payload);
  }

  updateInfo(payload: EditDriverDto) {
    return this.http.patch(`${this.apiBase}/${payload.id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiBase}/${id}`);
  }

  clearCache() {
    this.driversStore.setHasCache(false, { restartTTL: true });
  }

}
