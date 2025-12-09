import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth-guard';
import { RoleGuard } from './core/auth/guards/role-guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./features/dashboards/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard),
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'user',
    loadComponent: () => import('./features/dashboards/user-dashboard/user-dashboard').then(m => m.UserDashboard),
    canActivate: [AuthGuard],
    children:[
      {
        path: 'complaints',
        loadChildren: () => import('./features/complaints/complaints.routes').then(m => m.complaintRoutes)
      }
    ]
  },
  {
    path: 'officer',
    loadComponent: () => import('./features/dashboards/officer-dashboard/officer-dashboard').then(m => m.OfficerDashboard),
    canActivate: [AuthGuard],
    children:[
      {
        path: 'complaints',
        loadChildren: () => import('./features/complaints/complaints.routes').then(m => m.complaintRoutes)
      }
    ]
  },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: '**', redirectTo: '/user' }
];