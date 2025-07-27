import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  cart: any;
  removeItem(arg0: any) {
    throw new Error('Method not implemented.');
  }
  
  private selectedItems: { id: number; name: string; count: number }[] = [];

  private baseUrl = 'http://localhost:5000/api';
  lastOrder: { table: string; items: any[] } | null = null;

  constructor(private http: HttpClient) {}

  // گرفتن آیتم‌های یک دسته
  getItemsByCategory(category: string) {
    return this.http.get<any>(`${this.baseUrl}/items/?item_type=${category}&size=20&page=1`);
  }

  // افزودن آیتم یا افزایش تعداد
  addItem(item: { id: number; name: string }) {
    const existing = this.selectedItems.find(i => i.id === item.id);
    if (existing) {
      existing.count++;
    } else {
      this.selectedItems.push({ ...item, count: 1 });
    }
  }

  // گرفتن سبد خرید
  setItems(items: { id: number; name: string; count: number }[]) {
    this.selectedItems = items;
  }
  
  getItems() {
    return this.selectedItems;
  }

  // پاک‌کردن سبد خرید
  clearCart() {
    this.selectedItems = [];
  }

  // ارسال سفارش
  submitOrderToBackend(table_number: number, items: { id: number; quantity: number }[]) {
    return this.http.post(`${this.baseUrl}/orders/`, { table_number, items });
  }
}




