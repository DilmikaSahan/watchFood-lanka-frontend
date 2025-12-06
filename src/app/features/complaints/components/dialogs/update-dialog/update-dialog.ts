import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComplaintsService, Complaint} from '../../../services/complaints.service'; 
type ProvinceName = 'Western' | 'Central' | 'Southern' | 'Eastern' | 'Northern';


@Component({
  selector: 'app-update-dialog',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './update-dialog.html',
  styleUrl: './update-dialog.css',
})
export class UpdateDialog {
  complaint!: Complaint;
  role!: 'USER' | 'OFFICER';

  categories = [
    'FOOD_POISONING',
    'HYGIENE',
    'SERVICE_ISSUE',
    'PACKAGING',
    'OTHER'
  ];

  provinces:ProvinceName[] = ["Western", "Central", "Southern", "Eastern", "Northern"];

  provinceDistrictMap: Record<ProvinceName, string[]> = {
    Western: ["Colombo", "Gampaha", "Kalutara"],
    Central: ["Kandy", "Matale", "Nuwara Eliya"],
    Southern: ["Galle", "Matara", "Hambantota"],
    Eastern: ["Trincomalee", "Batticaloa", "Ampara"],
    Northern: ["Jaffna", "Kilinochchi", "Mannar"]
  };
  districts: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<UpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private complaintsService: ComplaintsService
  ) {
    this.complaint = {...data.complaint}; // clone to avoid direct changes
    this.role = data.role;

    this.loadDistricts();
  }
  onProvinceChange() {
    this.loadDistricts();
    this.complaint.district = ''; // reset district selection
} loadDistricts() {
  const province = this.complaint.province as ProvinceName;
  this.districts = this.provinceDistrictMap[province] || [];
}
  isUserValid(): boolean {
    return !!(
      this.complaint.category &&
      this.complaint.description &&
      this.complaint.province &&
      this.complaint.district &&
      this.complaint.city &&
      this.complaint.location
    );
  }

  isOfficerValid(): boolean {
    return !!(
      this.complaint.status &&
      this.complaint.officerNote
    );
  }

  update() {
    if (this.role === 'USER') {
      if (!this.isUserValid()) return alert('Please fill in all required fields!.');
      this.complaintsService.updateUserComplaint(this.complaint).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else if (this.role === 'OFFICER') {
      if (!this.isOfficerValid()) return alert('Please fill in all required fields!.');
      this.complaintsService.updateOfficerComplaint(this.complaint).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

}
