import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { AzureBlobService } from '../../services/azure-blob-service';
interface DistrictMap{
  [province: string]: string[];
}
@Component({
  selector: 'app-complaint-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './complaint-form.html',
  styleUrl: './complaint-form.css',
})
export class ComplaintForm implements OnInit {
  @Output() submitComplaint = new EventEmitter<any>();

  complaintForm!: FormGroup;
  uploadedFileNames: string[] = [];
  selectedFiles: File[] = [];

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
  constructor(private fb: FormBuilder, private blobService: AzureBlobService) {}

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
      const districtControl = this.complaintForm.get('district');
      districtControl?.reset('');
      if(this.filteredDistricts.length){
        districtControl?.enable();
      } else {
        districtControl?.disable();
      }
    });
  }
  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  async uploadFiles(): Promise<void> {
    if (!this.selectedFiles.length) return;

    for (const file of this.selectedFiles) {
      const uniqueFileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}-${file.name}`;

      const uploadedName = await this.blobService.uploadFile(file, uniqueFileName);
      this.uploadedFileNames.push(uploadedName);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.complaintForm.invalid) {
      this.complaintForm.markAllAsTouched();
      return;
    }

    // Upload files first
    await this.uploadFiles();

    // Emit form data with uploaded image URLs
    const payload = {
      ...this.complaintForm.value,
      imageUrl: this.uploadedFileNames
    };

    this.submitComplaint.emit(payload);
  }

}