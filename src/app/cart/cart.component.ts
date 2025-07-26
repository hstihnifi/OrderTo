import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  category = '';
  items: {
image: any; name: string, price: number 
}[] = [];
  itemCounts: Record<string, number> = {};
  apiService: any;
  item: any;
  

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private api: ApiService
    
  ) {}

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('category')!;
    this.category = category;
  
    this.api.getItemsByCategory(category).subscribe({
      next: (res) => {
        this.items = res;
        this.itemCounts = {};
        this.items.forEach(item => this.itemCounts[item.name] = 0);
      },
      error: (err) => console.error('❌ خطا در دریافت آیتم‌ها:', err)
    });
  }
  

  increase(itemName: string) {
    this.itemCounts[itemName]++;
  }

  decrease(itemName: string) {
    if (this.itemCounts[itemName] > 0) this.itemCounts[itemName]--;
  }

  submitOrder() {
    const selectedItems = Object.entries(this.itemCounts)
      .filter(([_, count]) => count > 0)
      .map(([name, count]) => ({ name, count }));
  
    this.orderService.addItems(selectedItems);
    alert('آیتم‌ها به سبد خرید اضافه شدند!');
    this.router.navigate(['/']);
  }

  goToSubmit() {
    this.router.navigate(['/submit']);
  }
}
