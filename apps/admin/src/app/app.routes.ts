import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@bb/admin/dashboard').then(m => m.AdminDashboardModule
    )
  },
  {
    path: 'routing',
    loadChildren: () => import('@bb/admin/routes').then(m => m.AdminRoutesModule)
  },
  {
    path: 'drivers',
    loadChildren: () => import('@bb/admin/drivers').then(m => m.AdminDriversModule)
  },
  {
    path: 'buses',
    loadChildren: () => import('@bb/admin/buses').then(m => m.BusesModule)
  },
  {
    path: 'devices',
    loadChildren: () => import('@bb/admin/devices').then(m => m.DevicesModule)
  },
  {
    path: 'students',
    loadChildren: () => import('@bb/admin/students').then(m => m.StudentsModule)
  },


];
