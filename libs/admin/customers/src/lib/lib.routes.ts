import { Route } from '@angular/router';
import { CustomersComponent } from './customers.component';

export const adminCustomersRoutes: Route[] = [
  { path: '', component: CustomersComponent, data: {title: 'Customers Directory'} },
];
