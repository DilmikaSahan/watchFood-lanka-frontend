import { Component } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-admin-dashboard',
  imports: [Navbar, MatGridListModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

}
