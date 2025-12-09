import { Component } from '@angular/core';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { Router,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-officer-dashboard',
  imports: [Navbar,RouterOutlet],
  templateUrl: './officer-dashboard.html',
  styleUrl: './officer-dashboard.css',
})
export class OfficerDashboard {
  constructor(private router: Router) {}
  myAssignments() {
    this.router.navigate(['/officer/complaints/officerAssignedComplaints']);
  }
  navigateToViewComplaints() {
    this.router.navigate(['/officer/complaints/viewAllComplaints'], { state: { viewMode: 'all' } });
  }
}
