import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintsService, Complaint } from '../../services/complaints.service';
import { KeycloakService } from '../../../../core/auth/services/keycloak';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateDialog} from '../dialogs/update-dialog/update-dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-complaint-detail',
  imports: [CommonModule, FormsModule, MatDialogModule],
  standalone: true,
  templateUrl: './complaint-detail.html',
  styleUrl: './complaint-detail.css',
})
export class ComplaintDetail {
  complaintId!: number;
  complaint!: Complaint;
  role!: 'USER' | 'OFFICER' | 'ADMIN';


  roles: string[] = [];
  selectedImage: string | null = null;

  constructor(
    private complaintsService: ComplaintsService,
    private keycloakservice: KeycloakService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.roles = this.keycloakservice.getRoles(); 
    if(this.roles.includes('admin')){
      this.role = 'ADMIN';
    } else if(this.roles.includes('officer')){
      this.role = 'OFFICER';
    } else {
      this.role = 'USER';
    }
    this.complaintId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadComplaint();
  }

  loadComplaint() {
    this.complaintsService.getComplaint(this.complaintId).subscribe({
      next: (data) => {
      console.log('Received complaint data:', data); // <-- log the full object
      this.complaint = data;
    },
    error: (err) => console.error('Error fetching complaint:', err)
    });
  }

  openUpdateDialog() {
    const dialogRef = this.dialog.open(UpdateDialog, {
      width: '600px',
      maxWidth: '700px',
      height: 'auto',
      panelClass: 'complaint-dialog-container',
      data: { complaint: this.complaint, role: this.role }
    });

    dialogRef.afterClosed().subscribe(updated => {
      if (updated) this.loadComplaint(); // reload after update
    });
  }
  getImageUrl(fileName: string) {
  return `https://sahan.blob.core.windows.net/complaint-images/${fileName}?${'sp=racwdl&st=2025-12-05T08:15:28Z&se=2027-12-05T16:30:28Z&spr=https&sv=2024-11-04&sr=c&sig=JBqfyR7N4v1UMyeIR9IJvsz3eWhrpLQtC8wNS8tyL%2Bc%3D'}`;
}
  openImageViewer(img: string) {
  this.selectedImage = img;
}

closeImageViewer() {
  this.selectedImage = null;
}

canUpdate(): boolean {
    return this.role === 'USER' || (this.role === 'OFFICER' && this.complaint.officer==this.keycloakservice.getUserID());
  }
canDelete(): boolean {
    return this.role === 'USER';
}
canAssign(): boolean {
    return this.role === 'OFFICER' && this.complaint.officer==null;
}
assignToMe(){
  if(confirm("Do you want to assign this complaint to yourself?")) {
    if(this.complaint.status=='PENDING' && this.complaint.officer==null){
      this.complaintsService.assignComplaintToOfficer(this.complaintId).subscribe({
        next: () => {alert("Complaint assigned successfully."); this.loadComplaint();},
        error: (err) => {}});
    }else{
      alert("Only unassigned complaints with PENDING status can be assigned.");
    }
  
  }
}
deleteComplaint(){
  if(confirm("Are you sure you want to delete this complaint?")) {
    if(this.complaint.status!=='PENDING'){
      return alert("Only complaints with PENDING status can be deleted.");
    }else{
      this.complaintsService.deleteComplaint(this.complaintId).subscribe({
        next: () => {alert("Complaint deleted successfully."); this.router.navigate(['user/complaints']);},
        error: (err) => {
        console.error('Error deleting complaint:', err);
        alert("Error deleting complaint.");
    }
  });
  }
}
}
}
