import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

interface DistrictMap{
  [province: string]: string[];
}
@Component({
  selector: 'app-complaint-form',
  imports: [ReactiveFormsModule],
  templateUrl: './complaint-form.html',
  styleUrl: './complaint-form.css',
})
export class ComplaintForm implements OnInit {
  @Output() submitComplaint = new EventEmitter<any>();

  complaintForm!: FormGroup;
  provinces: string[] = [
    'Central',
    'Eastern',
    'North Central',
    'Northern',
    'North Western',
    'Sabaragamuwa',
    'Southern',
    'Uva',
    'Western'
  ];

  districtsByProvince: DistrictMap = {
    'Central': ['Kandy', 'Matale', 'Nuwara Eliya'],
    'Eastern': ['Ampara', 'Batticaloa', 'Trincomalee'],
    'North Central': ['Anuradhapura', 'Polonnaruwa'],
    'Northern': ['Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu'],
    'North Western': ['Kurunegala', 'Puttalam'],
    'Sabaragamuwa': ['Kegalle', 'Ratnapura'],
    'Southern': ['Galle', 'Matara', 'Hambantota'],
    'Uva': ['Badulla', 'Monaragala'],
    'Western': ['Colombo', 'Gampaha', 'Kalutara']
  };

  filteredDistricts: string[] = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.complaintForm = this.fb.group({
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      province: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.complaintForm.get('province')?.valueChanges.subscribe((province: string) => {
      this.filteredDistricts = this.districtsByProvince[province] || [];
      this.complaintForm.get('district')?.reset('');
    });
  }

  onSubmit(): void {
    if (this.complaintForm.invalid) {
      this.complaintForm.markAllAsTouched();
      return;
    }

    this.submitComplaint.emit(this.complaintForm.value);
  


}
}