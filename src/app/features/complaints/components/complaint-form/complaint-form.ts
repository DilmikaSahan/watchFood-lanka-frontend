import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BlobServiceClient} from "@azure/storage-blob";

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
  uploadedImageUrls: string[] = [];
  selectedFiles: File[] = [];

  readonly blobSasUrl = 'https://sahan.blob.core.windows.net/complaint-images?sp=racwdli&st=2025-12-05T04:57:10Z&se=2026-12-05T13:12:10Z&spr=https&sv=2024-11-04&sr=c&sig=3aKW8E%2FbcyLZLonLwHazlfv8JDzMHLMdUXj4P3OI4RQ%3D';
  CONTAINER_NAME = 'complaint-images';

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

    const containerClient = new BlobServiceClient(this.blobSasUrl).getContainerClient(this.CONTAINER_NAME);

    for (const file of this.selectedFiles) {
      const blobClient = containerClient.getBlockBlobClient(file.name);
      await blobClient.uploadData(file, { blobHTTPHeaders: { blobContentType: file.type } });
      const fileUrl = `${containerClient.url}/${file.name}`;
      this.uploadedImageUrls.push(fileUrl);
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
      imageUrl: this.uploadedImageUrls
    };

    this.submitComplaint.emit(payload);
  }

}