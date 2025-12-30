import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Complaint {
  complaintId: number;
  complainerId: string;        // UUID string
  category: string;            
  description: string;
  province?: string;
  district?: string;
  city?: string;
  location?: string;
  imageUrl?: string[];        
  status?: string;             
  priorityLevel?: string;      // set by AI
  officer?: string;            // officer UUID
  officerNote?: string;
  complaintAt?: Date;
 }

export interface CreateComplaintPayload {
  category: string;
  description: string;
  province: string;
  district: string;
  city: string;
  location: string;
  imageUrl: string[];
  
}

export interface UpdateStatusPayload  {
  officer: string;
  status: string;        
  officerNote?: string;
}

export interface Complaintstatatistics {
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  inProgressComplaints: number;
  rejectedComplaints: number;
}

@Injectable({
    providedIn: 'root'
})
export class ComplaintsService {
    private baseUrl = 'http://localhost:8081/api/v1/complaints';
    constructor(private http: HttpClient) {}

    getAllComplaints(): Observable<Complaint[]>{
        return this.http.get<Complaint[]>(`${this.baseUrl}/allComplaints`)
    }
    getComplaint(complaintId: number): Observable<Complaint> {
      return this.http.get<Complaint>(`${this.baseUrl}/getComplaint/${complaintId}`).pipe(
        tap(complaint => console.log('Fetched complaint:', complaint))
      );
    }
    addComplaint(payload: CreateComplaintPayload): Observable<any> {
      return this.http.post(`${this.baseUrl}/addComplaint`, payload);
    }
    deleteComplaint(complaintId: number) {
      return this.http.delete(`${this.baseUrl}/deleteComplaint/${complaintId}`);
    }
    getComplaintsByUser(): Observable<Complaint[]> {
      return this.http.get<Complaint[]>(`${this.baseUrl}/myComplaints`);
    }
    getComplaintsByAssignedOfficer(): Observable<Complaint[]> {
      return this.http.get<Complaint[]>(`${this.baseUrl}/assignedComplaints`);
    }
    updateUserComplaint(complaint: Complaint) {
      return this.http.put(`${this.baseUrl}/updateComplainUser`, complaint);
    }

    updateOfficerComplaint(ComplaintId: number, payload: UpdateStatusPayload) {
      return this.http.put(`${this.baseUrl}/updateOfficerSection/${ComplaintId}`, payload);
    }
    uploadImages(complaintId: number, images: string[]): Observable<string[]> {
    return this.http.put<string[]>(`${this.baseUrl}/addImages/${complaintId}`, images);
    }

    deleteImage(complaintId: number, imageUrls: string[]): Observable<string []> {
    return this.http.put<string []>(`${this.baseUrl}/deleteImages/${complaintId}`, imageUrls);
    }
    assignComplaintToOfficer(complaintId: number) {
      console.log('Assigning complaint to officer:', complaintId);
      return this.http.put(`${this.baseUrl}/assignOfficer/${complaintId}`, {});
    }
    getComplaintStatistics(): Observable<Complaintstatatistics> {
      return this.http.get<Complaintstatatistics>(`${this.baseUrl}/getComplaintStats`);
    }
    unassignComplaintFromOfficer(complaintId: number) {
      return this.http.put(`${this.baseUrl}/updateOfficerAssignment/${complaintId}`, {});
    }

}