import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule],
})
export class CartComponent implements OnInit {
  category = '';
  items: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category') || '';
    this.orderService.getItemsByCategory(this.category).subscribe({
      next: (res) => {
        this.items = res.results || res;
        this.items.forEach(item => {
          this.itemCounts[item.id] = 0;
        });
      },
      error: (err) => console.error('❌ خطا در دریافت آیتم‌ها:', err)
    });
  }


  itemCounts: { [key: number]: number } = {}; // برای ذخیره تعداد انتخاب شده

  increase(itemId: number) {
    this.itemCounts[itemId] = (this.itemCounts[itemId] || 0) + 1;
  }
  
  decrease(itemId: number) {
    if (this.itemCounts[itemId] > 0) {
      this.itemCounts[itemId]--;
    }
  }
  
  submitCart() {
    for (let item of this.items) {
      const count = this.itemCounts[item.id];
      if (count && count > 0) {
        for (let i = 0; i < count; i++) {
          this.orderService.addItem({ id: item.id, name: item.name });
        }
      }
    }
  
    this.router.navigate(['/']);
  }
  
  
  

  goToSubmit() {
    this.router.navigate(['/submit']);
  }
}

