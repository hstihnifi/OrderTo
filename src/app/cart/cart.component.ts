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
    
    console.log('🔍 Cart component initialized for category:', category);
    console.log('🌐 API URL will be:', `http://localhost:5000/api/items/?item_type=${category}`);
  
    this.api.getItemsByCategory(category).subscribe({
      next: (res) => {
        console.log('✅ API Response received:', res);
        console.log('📦 Number of items:', res?.length || 0);
        this.items = res;
        this.itemCounts = {};
        this.items.forEach(item => this.itemCounts[item.name] = 0);
      },
      error: (err) => {
        console.error('❌ خطا در دریافت آیتم‌ها:', err);
        console.error('🔍 Error details:', {
          status: err.status,
          message: err.message,
          url: err.url || 'No URL in error'
        });
      }
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

  testApi() {
    console.log('🧪 Testing API connection...');
    
    // Test the health endpoint first
    const healthUrl = 'http://localhost:5000/api/health';
    fetch(healthUrl)
      .then(response => {
        console.log('🏥 Health check response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('🏥 Health check data:', data);
        
        // Now test the items endpoint
        const itemsUrl = `http://localhost:5000/api/items/?item_type=${this.category}`;
        return fetch(itemsUrl);
      })
      .then(response => {
        console.log('📦 Items API response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('📦 Items API data:', data);
        alert(`API Test Result: Found ${data?.length || 0} items for ${this.category}`);
      })
      .catch(error => {
        console.error('🚨 API Test failed:', error);
        alert(`API Test Failed: ${error.message}`);
      });
  }
}
