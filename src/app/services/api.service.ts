import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://alimento-backend.liara.run/api';

  constructor(private http: HttpClient) {}

  // گرفتن آیتم‌های مرتبط با یک دسته‌بندی
  getItemsByCategory(category: string): Observable<any> {
    const url = `${this.baseUrl}/items/?item_type=${category}&size=20&page=1`;
    return this.http.get<any>(url);
  }

  // اگر هنوز از getAllItems جایی استفاده می‌کنی
  getAllItems(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/items`);
  }
}



