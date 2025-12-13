import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatCardModule, MatCardActions, } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { OfficerDetails } from '../../services/admin-service';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-view-officer-details',
  imports: [MatCardModule,MatCardActions,DatePipe,CommonModule,MatFormFieldModule,MatSelectModule,FormsModule],
  templateUrl: './view-officer-details.html',
  styleUrl: './view-officer-details.css',
})
export class ViewOfficerDetails implements OnInit {

  officer!: OfficerDetails;
  OriginalOfficer!: OfficerDetails;
  officerStatusList = [
    'ACTIVE',
    'RETIRED',
    'TEMP_SUSPENDED',
    'TERMINATED'
  ];

  districtList = [
    'Colombo', 'Gampaha', 'Kalutara',
    'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota',
    'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa',
    'Ampara', 'Trincomalee', 'Kurunegala',
    'Puttalam', 'Anuradhapura', 'Polonnaruwa',
    'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle'
  ];

  constructor(private route: ActivatedRoute,private router:Router, private adminService: AdminService) {}
  ngOnInit(): void {
    if(history.state && history.state.officer){
      this.officer=history.state.officer;
      this.OriginalOfficer={...this.officer};

    }
  }
  refreshOfficerDetails(){
    
  }

  goBack(){
    this.router.navigate(['/admin/complaints/adminAllOfficerView']);
  }
  updateOfficer(officerStatus:string, accountableDistrict:string){
    const payload = {officerStatus,accountableDistrict};
    if(confirm("Are you sure you want to update the officer details?")) {
      const isStatusChanged = this.officer.officerStatus !== this.OriginalOfficer.officerStatus;
      const isDistrictChanged = this.officer.accountableDistrict !== this.OriginalOfficer.accountableDistrict;

      if(!isStatusChanged && !isDistrictChanged){
        alert("No changes detected to update.");
        return;
      }
      console.log('sending :', this.officer.id,status,accountableDistrict)
      this.adminService.updateOfficerDetails(this.officer.id,payload).subscribe({
        next: (response) => {
          alert("Officer details updated successfully."); 
          this.OriginalOfficer={...this.officer};
          this.refreshOfficerDetails();
        },
        error: (error) => {
          console.error("Error updating officer details:", error);
          alert("Failed to update officer details. Please try again.");
        }

    });
  }
}
}