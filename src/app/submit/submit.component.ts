import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  selectedItems: { name: string; count: number }[] = [];
  tableNumber: string = '';
items: any;

  constructor(public orderService: OrderService) {}

  ngOnInit(){
    this.selectedItems = this.orderService.getItems();
    console.log('سفارشات در submit:', this.selectedItems); // 👈 اینو ببین تو کنسول چیزی میاد؟
  }

  finalizeOrder() {
    if (!this.tableNumber.trim()) {
      alert('لطفاً شماره میز را وارد کنید.');
      return;
    }

    this.orderService.submitOrder(this.tableNumber);
    alert('سفارش ثبت شد!');
  }
}


