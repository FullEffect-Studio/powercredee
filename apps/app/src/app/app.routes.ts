import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@bb/admin/dashboard').then(m => m.AdminDashboardModule
    )
  },

  {
    path: 'drivers',
    loadChildren: () => import('@bb/admin/drivers').then(m => m.AdminDriversModule)
  },
  {
    path: 'devices',
    loadChildren: () => import('@bb/admin/devices').then(m => m.DevicesModule)
  },


];
