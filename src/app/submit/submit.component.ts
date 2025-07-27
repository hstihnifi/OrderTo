import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css'],
  imports: [CommonModule,FormsModule ]
})
export class SubmitComponent implements OnInit {
  selectedItems: { id: number; name: string; count: number }[] = [];
  tableNumber: number = 1;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.selectedItems = this.orderService.getItems();
    console.log('📦 آیتم‌های انتخاب‌شده:', this.selectedItems);
  }
  

  submitFinalOrder() {
    const items = this.selectedItems.map(item => ({
      id: item.id,
      quantity: item.count
    }));

    this.orderService.submitOrderToBackend(this.tableNumber, items).subscribe({
      next: (res) => {
        console.log('✅ سفارش ثبت شد:', res);
        this.orderService.clearCart();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('❌ خطا در ثبت سفارش:', err);
      }
    });
  }
}



