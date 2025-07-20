// home.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories = ['نوشیدنی‌ها', 'دسر', 'غذا'];

  constructor(private router: Router) {}

  goToCategory(category: string) {
    this.router.navigate(['/cart', category]);
  }

  goToSubmit() {
    this.router.navigate(['/submit']);
  }
}
