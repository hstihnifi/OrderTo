import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  removeItem(arg0: any) {
    throw new Error('Method not implemented.');
  }
  private items: { name: string; count: number }[] = [];
  private _lastOrder: { table: string; items: { name: string; count: number }[] } | null = null;
  cart: any;

  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:5000'; // ← آدرس بک‌اندت

  // 📦 گرفتن دسته‌بندی‌ها
  getCategories() {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  // 🍰 گرفتن آیتم‌های یک دسته‌بندی
  getItemsByCategory(category: string) {
    return this.http.get<{ name: string, price: number }[]>(`${this.baseUrl}/items?category=${category}`);
  }

  // 📝 ثبت سفارش در دیتابیس
  submitOrderToBackend(table: string, items: { name: string, count: number }[]) {
    return this.http.post(`${this.baseUrl}/orders`, { table, items });
  }

  // 💾 ذخیره آیتم‌ها در حالت فرانت
  addItems(newItems: { name: string, count: number }[]) {
    this.items.push(...newItems);
    console.log('🧾 آیتم‌ها در OrderService:', this.items);
  }

  getItems() {
    return this.items;
  }

  submitOrder(table: string, items: { name: string; count: number }[]) {
    return this.http.post('http://localhost:5000/api/orders', {
      table,
      items
    });
  }
  clearCart() {
    this.items = [];
  }

  get lastOrder() {
    return this._lastOrder;
  }
}



