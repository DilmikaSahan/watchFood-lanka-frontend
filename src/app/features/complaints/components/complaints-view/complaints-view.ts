import { AfterViewInit, Component, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-complaints-view',
  imports: [ MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, CommonModule ],
  standalone: true,
  templateUrl: './complaints-view.html',
  styleUrl: './complaints-view.css',
})
export class ComplaintsView implements AfterViewInit {
  displayedColumns: string[] = ['complaintId', 'category', 'status', 'district', 'complaintAt', 'actions'];
  dataSource: MatTableDataSource<Complaint> = new MatTableDataSource();
  showActions = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private complaintService: ComplaintsService, private keycloakservice: KeycloakService) {}
  roles: string[] = [];

  ngOnInit(): void {
    this.loadComplaints();
    this.roles = this.keycloakservice.getRoles();
    this.adjustColumnsByRole();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadComplaints() {
    this.complaintService.getAllComplaints().subscribe({
      next: (complaints) => this.dataSource.data = complaints,
      error: (err) => console.error('Error fetching complaints', err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewComplaint(complaint: Complaint) {
    console.log('View complaint', complaint);
  }

  adjustColumnsByRole() {
    const privileged = this.roles.some(role =>
      ['admin', 'officer'].includes(role.toLowerCase())
    );

    if (privileged) {
      this.displayedColumns = [
        'complaintId',
        'complainerId',
        'category',
        'complaintAt',
        'province',
        'district',
        'city',
        'location',
        'status',
        'officer',
        'officerNote',
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
