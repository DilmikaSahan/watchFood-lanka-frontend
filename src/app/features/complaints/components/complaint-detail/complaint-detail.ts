import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintsService, Complaint } from '../../services/complaints.service';
import { KeycloakService } from '../../../../core/auth/services/keycloak';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateDialog} from '../dialogs/update-dialog/update-dialog';
import { ActivatedRoute } from '@angular/router';


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
    private route: ActivatedRoute
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
  openImageViewer(img: string) {
  this.selectedImage = img;
}

closeImageViewer() {
  this.selectedImage = null;
}

  canUpdate(): boolean {
    return this.role === 'USER' || this.role === 'OFFICER';
  }

}
