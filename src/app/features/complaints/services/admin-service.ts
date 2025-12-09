import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface UserStatistics {
  totalUsers: number;
  totalOfficers: number;
  totalAdmins: number;
  totalRegularUsers: number;
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
}
