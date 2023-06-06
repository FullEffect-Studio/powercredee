import { Route } from '@angular/router';
import {adminBranchesRoutes} from "@bb/admin/branches";

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
];
