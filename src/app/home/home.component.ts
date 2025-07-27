import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories = [
    { key: 'drink', title: 'نوشیدنی‌ها' },
    { key: 'main_dish', title: 'غذای اصلی' },
    { key: 'dessert', title: 'دسر' }
  ];
cat: any;

  constructor(private router: Router) {}

  goToCategory(category: string) {
    this.router.navigate(['/cart', category]);
  }

  goToSubmit() {
    this.router.navigate(['/submit']);
  }
  
}


