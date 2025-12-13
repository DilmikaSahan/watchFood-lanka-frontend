import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';


export interface UserStatistics {
  totalUsers: number;
  totalOfficers: number;
  totalAdmins: number;
  totalRegularUsers: number;
}

export interface UserDetails{
    id: number;
    fullName: string;
    email: string;
    role: string;
    phoneNumber: string;
    createAT: Date;
    updateAT: Date;
}
export interface OfficerDetails{
    id : number;
    officerId : number;
    accountableDistrict: string;
    officerStatus: string;
    assignedCasesCount: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    createAT: Date;
    updateAT: Date;
}
export interface UpdateOfficerPayload {
    officerStatus: string;
    accountableDistrict: string;
}
@Injectable({
  providedIn: 'root',
})

export class AdminService {
  private baseUrl = 'http://localhost:8081/api/v1/user';
  constructor(private http: HttpClient) {}

  getUserStatistics(): Observable<UserStatistics> {
    return this.http.get<UserStatistics>(`${this.baseUrl}/getUserStats`);
  }
  getAllusers(): Observable<UserDetails[]>{
    return this.http.get<UserDetails[]>(`${this.baseUrl}/allusers`);
  }
  getAllOfficers(): Observable<OfficerDetails[]>{
    return this.http.get<OfficerDetails[]>(`${this.baseUrl}/getOfficerDetails`);
  }
  updateOfficerDetails(Id:number, payload: UpdateOfficerPayload): Observable<any>{ 
    return this.http.put<any>(`${this.baseUrl}/updateOfficerDetails/${Id}`, payload);
   }
   UpdateAssignedCasesCount(officerId: string | undefined,option:string): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/UpdateAssignedCasesCount/${officerId}`,option);
  }
}
