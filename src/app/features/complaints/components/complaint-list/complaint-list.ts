import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Complaint } from '../../services/complaints.service';
import {CommonModule} from '@angular/common';
import { C } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-complaint-list',
  imports: [CommonModule],
  templateUrl: './complaint-list.html',
  styleUrl: './complaint-list.css',
})
export class ComplaintList {
  @Input() complaints: Complaint[] = [];
  @Input() showActions = false;
  @Output() view = new EventEmitter<Complaint>();
  @Output() action = new EventEmitter<Complaint>();

}
