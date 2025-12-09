import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { ComplaintsService } from '../../services/complaints.service';
import { AdminService } from '../../services/admin-service';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-admin-dashboard-main',
  imports: [MatGridListModule,CommonModule,MatCardModule],
  templateUrl: './admin-dashboard-main.html',
  styleUrl: './admin-dashboard-main.css',
})
export class AdminDashboardMain {
  stats:any={};

  constructor(private ComplaintsService: ComplaintsService, private AdminService: AdminService) { 
  }
  ngOnInit() {
    this.ComplaintsService.getComplaintStatistics().subscribe((data) => {
      this.stats = {...this.stats,...data};
    });
    this.AdminService.getUserStatistics().subscribe((data) => {
      this.stats = {...this.stats,...data};
    });
  }

}
