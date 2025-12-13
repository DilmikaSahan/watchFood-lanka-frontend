import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';   
import { AdminService, OfficerDetails } from '../../services/admin-service';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-officerdetails-view',
  imports: [CommonModule, MatPaginatorModule, MatSortModule, MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './admin-officerdetails-view.html',
  styleUrl: './admin-officerdetails-view.css',
})
export class AdminOfficerdetailsView implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'officerId', 'accountableDistrict', 'officerStatus', 'assignedCasesCount', 'fullName','phoneNumber'];
  displayeColumnsWithActions = [...this.displayedColumns, 'actions'];
  dataSource: MatTableDataSource<OfficerDetails>= new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.adminService.getAllOfficers().subscribe((officers) => {
      this.dataSource = new MatTableDataSource(officers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  viewOfficer(user: any){
    this.router.navigate(['/admin/complaints/viewOfficerDetails'], { state: { officer: user } });
  }
}