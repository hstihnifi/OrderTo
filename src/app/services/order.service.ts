import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private items: { name: string; count: number }[] = [];
  private _lastOrder: { table: string; items: { name: string; count: number }[] } | null = null;

  addItems(newItems: { name: string, count: number }[]) {
    this.items.push(...newItems);
    console.log('🧾 آیتم‌ها در OrderService:', this.items);
  }

  getItems() {
    return this.items;
  }

  submitOrder(tableNumber: string) {
    console.log(`✅ سفارش نهایی شد: میز ${tableNumber} - آیتم‌ها:`, this.items);
    this.items = [];
  }

  clearCart() {
    this.items = [];
  }

  get lastOrder() {
    return this._lastOrder;
  }
}


