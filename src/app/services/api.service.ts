import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // 🔧 Configuration: Change this URL to match your Python backend
  // Common ports: 8000 (Django), 5000 (Flask), 8080, 3000
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {
    console.log('🔧 ApiService initialized with baseUrl:', this.baseUrl);
  }

  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/items`);
  }
  
  getItemsByCategory(category: string): Observable<any[]> {
    const url = `${this.baseUrl}/items/?item_type=${category}`;
    console.log('🌐 Making API call to:', url);
    return this.http.get<any[]>(url);
  }
  
  
  submitOrder(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/`, data);
  }
}


