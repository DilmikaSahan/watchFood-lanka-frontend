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
  priorityLevel?: number;      // set by AI
  officer?: string;            // officer UUID
  officerNote?: string;
  complaintAt?: string;
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
  status: string;        
  officerNote?: string;
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
    getComplaintsByUser(userId: string): Observable<Complaint[]> {
      return this.http.get<Complaint[]>(`${this.baseUrl}/myComplaints`);
    }
    updateUserComplaint(complaint: Complaint) {
      return this.http.put(`/api/complaint/user`, complaint);
    }

    updateOfficerComplaint(complaint: Complaint) {
      return this.http.put(`/api/complaint/officer`, complaint);
  }

}