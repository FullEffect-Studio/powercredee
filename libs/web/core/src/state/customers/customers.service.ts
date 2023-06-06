import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {switchMap, tap } from 'rxjs/operators';
import {CustomersState, CustomersStore} from './customers.store';
import {AkitaFiltersPlugin} from "akita-filters-plugin";
import {CustomersQuery} from "./customers.query";
import {environment} from "@bb/admin/common";
import {AddBranchDto, BranchInListDto, EditBranchDto } from '@bb/shared/dtos';
import {EMPTY} from "rxjs";
import {AddCustomerDto, Customer, EditCustomerDto} from './customer.model';

@Injectable({ providedIn: 'root' })
export class CustomersService {

  apiBase
  filter
  constructor(private customersStore: CustomersStore,
              private query: CustomersQuery,
              private http: HttpClient) {
    this.apiBase = `${environment.server.baseUrl}/api/customers`;
    this.filter = new AkitaFiltersPlugin<CustomersState>(this.query);
  }


  get() {
    const request = this.http.get<Customer[]>(this.apiBase).pipe(
      tap((entities) => {
        this.customersStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(
      switchMap((hasCache) => {
        return hasCache ? EMPTY : request;
      })
    );
  }


  add(payload: AddCustomerDto) {
    return this.http.post(this.apiBase, payload);
  }

  updateInfo(payload: EditCustomerDto) {
    return this.http.patch(`${this.apiBase}/${payload.id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiBase}/${id}`);
  }

  clearCache() {
    this.customersStore.setHasCache(false, { restartTTL: true });
  }

}
