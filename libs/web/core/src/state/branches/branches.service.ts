import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {switchMap, tap } from 'rxjs/operators';
import {BranchState, BranchesStore} from './branches.store';
import {AkitaFiltersPlugin} from "akita-filters-plugin";
import {BranchesQuery} from "./branches.query";
import {environment} from "@bb/admin/common";
import {AddBranchDto, BranchInListDto, EditBranchDto } from '@bb/shared/dtos';
import {EMPTY} from "rxjs";

@Injectable({ providedIn: 'root' })
export class BranchesService {

  apiBase
  filter
  constructor(private branchesStore: BranchesStore,
              private query: BranchesQuery,
              private http: HttpClient) {
    this.apiBase = `${environment.server.baseUrl}/api/branches`;
    this.filter = new AkitaFiltersPlugin<BranchState>(this.query);
  }


  get() {
    const request = this.http.get<BranchInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.branchesStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(
      switchMap((hasCache) => {
        return hasCache ? EMPTY : request;
      })
    );
  }


  add(payload: AddBranchDto) {
    return this.http.post(this.apiBase, payload);
  }

  updateInfo(payload: EditBranchDto) {
    return this.http.patch(`${this.apiBase}/${payload.id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiBase}/${id}`);
  }

  clearCache() {
    this.branchesStore.setHasCache(false, { restartTTL: true });
  }

}
