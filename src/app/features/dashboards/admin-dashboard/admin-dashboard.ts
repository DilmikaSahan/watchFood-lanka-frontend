import { Component } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { AdminDashboardMain } from '../../complaints/pages/admin-dashboard-main/admin-dashboard-main';

@Component({
  selector: 'app-admin-dashboard',
  imports: [Navbar, AdminDashboardMain],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

}
