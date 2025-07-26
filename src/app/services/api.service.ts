import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/items`);
  }
  
  getItemsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/items/?item_type=${category}`);
  }
  
  
  submitOrder(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/`, data);
  }
}


