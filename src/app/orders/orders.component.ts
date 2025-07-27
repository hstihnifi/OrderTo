import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  lastOrder: { table: string; items: any[] } | null = null;

 

  constructor(private orderService: OrderService) {
    this.lastOrder = this.orderService.lastOrder;
  }
}
