import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComplaintsService, Complaint, UpdateStatusPayload} from '../../../services/complaints.service'; 
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AzureBlobService } from '../../../services/azure-blob-service'; 
type ProvinceName = 'Western' | 'Central' | 'Southern' | 'Eastern' | 'Northern';
import { KeycloakService } from '../../../../../core/auth/services/keycloak';


@Component({
  selector: 'app-update-dialog',
  imports: [CommonModule, FormsModule,MatTableModule,MatTabsModule],
  standalone: true,
  templateUrl: './update-dialog.html',
  styleUrl: './update-dialog.css',
})
export class UpdateDialog {
  complaint!: Complaint;
  updateStatusPayload!:UpdateStatusPayload;
  
  role!: 'USER' | 'OFFICER';

  currentImages: string[] = [];
  newImages: File[] = [];
  updatedImagesFileNames: string[] = [];
  deletedImages: string[] = [];

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
    private complaintsService: ComplaintsService,
    private azureBlobService: AzureBlobService
  ) {
    this.complaint = {...data.complaint}; // clone to avoid direct changes
    this.role = data.role;
    this.currentImages = this.complaint.imageUrl ? [...this.complaint.imageUrl] : [];

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
  getUrl(fileName: string): string {
    return `https://sahan.blob.core.windows.net/complaint-images/${fileName}?${'sp=racwdl&st=2025-12-05T08:15:28Z&se=2027-12-05T16:30:28Z&spr=https&sv=2024-11-04&sr=c&sig=JBqfyR7N4v1UMyeIR9IJvsz3eWhrpLQtC8wNS8tyL%2Bc%3D'}`
  }
  markImageForDeletion(img: string) {
  this.deletedImages.push(img);
  this.currentImages = this.currentImages.filter(i => i !== img);}

  onFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;

  if (!input.files) return;

  const files = Array.from(input.files);
  this.newImages.push(...files);}

  removeNewImage(file: File) {
  this.newImages = this.newImages.filter(f => f !== file);}

  async applyImageChanges() {

  if (this.deletedImages.length === 0 && this.newImages.length === 0)
    return alert("No image updates detected.");

  // API call: delete removed ones
  if (this.deletedImages.length > 0) {
    
    for(const img of this.deletedImages){
      try{
        await this.azureBlobService.deleteFile(img);
      }catch(err){
        console.error("Error deleting image from blob:", err);
      }
    }
    this.complaintsService.deleteImage(this.complaint.complaintId, this.deletedImages).subscribe(updatedUrls => {
      this.currentImages = updatedUrls;
      this.complaint.imageUrl = updatedUrls;
      this.deletedImages = [];
    });
  }

  // API call: upload new ones
  if (this.newImages.length > 0) {
    for (const file of this.newImages) {
      try{
        const uniqueFileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}-${file.name}`;
        const uploadedName = await this.azureBlobService.uploadFile(file, uniqueFileName);
        this.updatedImagesFileNames.push(uploadedName);
      }catch(err){
        console.error(`Error uploading image ${file.name}:`, err);
      }
    
    }
    this.complaintsService.uploadImages(this.complaint.complaintId, this.updatedImagesFileNames).subscribe(updatedUrls => {
      this.currentImages = updatedUrls;
      this.complaint.imageUrl = updatedUrls;
      this.newImages = [];
      this.updatedImagesFileNames = [];
    });
  }

  alert("Images updated successfully!");
}


  update() {
    if (this.role === 'USER') {
      if (!this.isUserValid()) return alert('Please fill in all required fields!.');
      this.complaintsService.updateUserComplaint(this.complaint).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else if (this.role === 'OFFICER') {
      if (!this.isOfficerValid()) return alert('Please fill in all required fields!.');
      this.updateStatusPayload={
        status:this.complaint.status??'PENDING',
        officerNote:this.complaint.officerNote || '',
        officer: this.complaint.officer || ''
      };

      this.complaintsService.updateOfficerComplaint(this.complaint.complaintId, this.updateStatusPayload).subscribe(() => {
      this.dialogRef.close(true);
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

}
