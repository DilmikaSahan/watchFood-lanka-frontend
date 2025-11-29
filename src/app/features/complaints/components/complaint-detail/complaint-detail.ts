import { Component, Input } from '@angular/core';
import { Complaint } from '../../services/complaints.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-complaint-detail',
  imports: [CommonModule],
  templateUrl: './complaint-detail.html',
  styleUrl: './complaint-detail.css',
})
export class ComplaintDetail {
  @Input() complaint!: Complaint;
}
