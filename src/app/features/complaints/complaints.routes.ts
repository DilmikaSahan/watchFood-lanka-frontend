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
    path: 'viewAllComplaints/:mode',
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
  },
  {
    path: 'adminViewAllUsers',
    loadComponent:()=>import('./components/admin-view-all-users/admin-view-all-users')
        .then(m => m.AdminViewAllUsers)
  },
  {
    path : 'adminAllOfficerView',
    loadComponent:()=>import('./pages/admin-officerdetails-view/admin-officerdetails-view')
        .then(m => m.AdminOfficerdetailsView)
  },
  {
    path: 'viewOfficerDetails',
    loadComponent: () =>
      import('./components/view-officer-details/view-officer-details')
        .then(m => m.ViewOfficerDetails)
  },
  {
    path: 'adminDashBoard',
    loadComponent: () =>import('../dashboards/admin-dashboard/admin-dashboard')
    .then(m=>m.AdminDashboard)
  }


];
