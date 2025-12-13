import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import{Router,RouterOutlet} from '@angular/router';
import { A11yModule } from "@angular/cdk/a11y";
@Component({
  selector: 'app-admin-dashboard',
  imports: [Navbar, RouterOutlet, A11yModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit{

  constructor(private router:Router) {}
  ngOnInit() {
    this.loadDashboardMain();

  }
  loadDashboardMain(){
    this.router.navigate(['/admin/complaints/adminDashboardMain']);
  }
  navigateToDashboard(){
    this.router.navigate(['/admin/complaints/adminDashBoard']);
  }
}
