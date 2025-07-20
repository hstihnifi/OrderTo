import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  goToSubmit() {
    // اگر می‌خوای بعد از ثبت سفارش بری صفحه submit این کدهارو اجرا کن
    this.router.navigate(['/home']);
  }
  
  category = '';
  items: string[] = [];
  itemCounts: Record<string, number> = {};

  allItems: Record<string, string[]> = {
    'نوشیدنی‌ها': ['قهوه', 'چای', 'لاته'],
    'دسر': ['کیک شکلاتی', 'بستنی', 'چیزکیک'],
    'غذا': ['پاستا', 'برگر', 'پیتزا']
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    
  ) {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.items = this.allItems[this.category] || [];

      this.itemCounts = {};
      this.items.forEach(item => this.itemCounts[item] = 0);
    });
  }

  increase(item: string) {
    this.itemCounts[item]++;
  }

  decrease(item: string) {
    if (this.itemCounts[item] > 0) this.itemCounts[item]--;
  }

  submitOrder() {
    const selectedItems = Object.entries(this.itemCounts)
      .filter(([_, count]) => count > 0)
      .map(([name, count]) => ({ name, count }));
  
    this.orderService.addItems(selectedItems);
    alert('آیتم‌ها به سبد خرید اضافه شدند!');
    this.router.navigate(['/']); // بازگشت به home
  }
  

  
  
  
}
