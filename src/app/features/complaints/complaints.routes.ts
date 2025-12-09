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
  },
  {
    path: 'viewAllComplaints',
    loadComponent: () =>
      import('./components/complaints-view/complaints-view')
        .then(m => m.ComplaintsView)
  },
  {
    path: 'officerAssignedComplaints',
    loadComponent: () =>
      import('./pages/officer-assigned-complaint-view/officer-assigned-complaint-view')
        .then(m => m.OfficerAssignedComplaintView)
  },
  {
    path: 'adminDashboardMain',
    loadComponent:()=>import('./pages/admin-dashboard-main/admin-dashboard-main')
        .then(m => m.AdminDashboardMain)
  }

];
