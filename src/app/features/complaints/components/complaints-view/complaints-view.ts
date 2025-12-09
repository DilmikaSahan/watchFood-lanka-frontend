import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ComplaintsService, Complaint } from '../../services/complaints.service';
import { KeycloakService } from '../../../../core/auth/services/keycloak';
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router';


@Component({
  selector: 'app-complaints-view',
  imports: [ MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, CommonModule ],
  standalone: true,
  templateUrl: './complaints-view.html',
  styleUrl: './complaints-view.css',
})
export class ComplaintsView implements AfterViewInit {
  @Input() viewMode: 'all' | 'assigned' | 'user' = 'user';
  displayedColumns: string[] = ['complaintId', 'category', 'status', 'district', 'complaintAt', 'actions'];
  dataSource: MatTableDataSource<Complaint> = new MatTableDataSource();
  showActions = true;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private complaintService: ComplaintsService, private keycloakservice: KeycloakService, private router: Router) {}
  roles: string[] = [];
  privileged: boolean = false;

  ngOnInit(): void {
    this.roles = this.keycloakservice.getRoles();
    this.privileged = this.roles.some(role => ['admin', 'officer'].includes(role.toLowerCase()));
    this.adjustColumnsByRole();
    this.loadComplaints();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadComplaints() {
    if(this.viewMode === 'user' && !this.privileged){
      this.complaintService.getComplaintsByUser().subscribe({
        next: (complaints) => this.dataSource.data = complaints,
        error: (err) => console.error('Error fetching complaints', err)
    });
    }else if(this.viewMode === 'assigned' && this.privileged){
      this.complaintService.getComplaintsByAssignedOfficer().subscribe({
        next: (complaints) => this.dataSource.data = complaints,
        error: (err) => console.error('Error fetching complaints', err)
      })
    }else{
      this.complaintService.getAllComplaints().subscribe({
        next: (complaints) => this.dataSource.data = complaints,
        error: (err) => console.error('Error fetching complaints', err)
      })
    }
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewComplaint(complaint: Complaint) {
    const base = this.privileged ? 'officer' : 'user';
    this.router.navigate([`${base}/complaints/details`, complaint.complaintId]);
  }

  adjustColumnsByRole() {
    if (this.privileged) {
      this.displayedColumns = [
        'complaintId',
        'category',
        'complaintAt',
        'province',
        'district',
        'city',
        'location',
        'status',
        'officer',
        'priorityLevel',
        'actions'
      ];
    } else {
      // User view
      this.displayedColumns = [
        'complaintId',
        'category',
        'complaintAt',
        'province',
        'district',
        'city',
        'location',
        'status',
        'actions'
      ];
    }
  }

}
