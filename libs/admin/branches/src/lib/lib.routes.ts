import { Route } from '@angular/router';
import { ManageBranchesComponent } from './manage-branches/manage-branches.component';

export const adminBranchesRoutes: Route[] = [
  { path: '', component: ManageBranchesComponent,
    data: { title: 'Company Branches' },},
];
