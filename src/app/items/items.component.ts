import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  category = '';
  items: { name: string; count: number }[] = [];
itemCounts: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];

      // شبیه‌سازی آیتم‌ها بر اساس دسته‌بندی
      if (this.category === 'drinks') {
        this.items = [
          { name: 'چای', count: 0 },
          { name: 'نوشابه', count: 0 },
        ];
      } else if (this.category === 'desserts') {
        this.items = [
          { name: 'کیک شکلاتی', count: 0 },
          { name: 'ژله', count: 0 },
        ];
      }
    });
  }

  increase(item: any) {
    item.count++;
    this.updateCart(item);
  }

  decrease(item: any) {
    if (item.count > 0) {
      item.count--;
      this.updateCart(item);
    }
  }

  updateCart(item: any) {
    const existing = this.orderService.cart.find((i: any) => i.name === item.name);
    if (existing) {
      existing.count = item.count;
      if (item.count === 0) {
        this.orderService.removeItem(this.orderService.cart.indexOf(existing));
      }
    } else {
      if (item.count > 0) {
        this.orderService.cart.push({ name: item.name, count: item.count });
      }
    }
  }
}
