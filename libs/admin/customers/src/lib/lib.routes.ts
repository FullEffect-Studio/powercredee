import { Route } from '@angular/router';
import { CustomersComponent } from './customers.component';
import {RegisterCustomerComponent} from "./register-customer.component";

export const adminCustomersRoutes: Route[] = [
  { path: '', component: CustomersComponent, data: {title: 'Customers Directory'} },
  { path: 'register', component: RegisterCustomerComponent, data: {title: 'New Customer'} },
];
