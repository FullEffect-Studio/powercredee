import { Route } from '@angular/router';
import {adminBranchesRoutes} from "@bb/admin/branches";
import {adminCustomersRoutes} from "@bb/admin/customers";

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@bb/admin/dashboard').then(m => m.AdminDashboardModule
    )
  },

  {
    path: 'branches',
    children: adminBranchesRoutes
  },
  {
    path: 'customers',
    children: adminCustomersRoutes
  }
];
