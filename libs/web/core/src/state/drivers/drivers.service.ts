import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {switchMap, tap } from 'rxjs/operators';
import {DriversState, DriversStore} from './drivers.store';
import {AkitaFiltersPlugin} from "akita-filters-plugin";
import {DriversQuery} from "./drivers.query";
import {environment} from "@bb/admin/common";
import {AddDriverDto, DriversInListDto, EditDriverDto } from '@bb/shared/dtos';
import {EMPTY} from "rxjs";

@Injectable({ providedIn: 'root' })
export class DriversService {

  apiBase
  filter
  constructor(private driversStore: DriversStore,
              private query: DriversQuery,
              private http: HttpClient) {
    this.apiBase = `${environment.server.baseUrl}/api/drivers`;
    this.filter = new AkitaFiltersPlugin<DriversState>(this.query);
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
