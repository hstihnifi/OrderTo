import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SubmitComponent } from './submit/submit.component';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart/:category', component: CartComponent },
  { path: 'home', component:HomeComponent},
  {
    path: 'submit',
    loadComponent: () => import('./submit/submit.component').then(m => m.SubmitComponent)
  },
  {path: 'orders', component:OrdersComponent}
];
