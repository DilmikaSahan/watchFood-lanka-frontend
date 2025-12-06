import { Routes } from '@angular/router';

export const complaintRoutes: Routes = [
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/user-complaints-add/user-complaints-add')
        .then(m => m.UserComplaintsAdd),
  },
  {
    //All complaints view
    path: 'view',
    loadComponent: () =>
        import('./pages/user-complaints-view/user-complaints-view')
          .then(m => m.UserComplaintsView), 
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./components/complaint-detail/complaint-detail')
        .then(m => m.ComplaintDetail)
  }

];
