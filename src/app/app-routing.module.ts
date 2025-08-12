import { inject } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { ListrecordsComponent } from './ecommerce/listrecords/listrecords.component';
import { OrdersComponent } from './ecommerce/orders/orders.component';
import { CartDetailsComponent } from './ecommerce/cart-details/cart-details.component';
import { CartsComponent } from './ecommerce/carts/carts.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { ListgroupsComponent } from './ecommerce/listgroups/listgroups.component';
import { GenresComponent } from './ecommerce/genres/genres.component';
import { GroupsComponent } from './ecommerce/groups/groups.component';
import { RecordsComponent } from './ecommerce/records/records.component';
import { AdminOrdersComponent } from './ecommerce/admin-orders/admin-orders.component';
import { UsersComponent } from './ecommerce/users/users.component';

const canActivate = () => {
  const guard = inject(AuthGuard);
  if (!guard.isLoggedIn()) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const appRoutes: Routes = [
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'listrecords/:idGroup', component: ListrecordsComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  
  // Ecommerce routes
  {
    path: '',
    component: EcommerceComponent,
    children: [
      { path: '', component: ListgroupsComponent },
      { path: 'listrecords/:idGroup', component: ListrecordsComponent },
      { path: 'listgroups', component: ListgroupsComponent },
      { path: 'genres', component: GenresComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'records', component: RecordsComponent },
      { path: 'cart-details', component: CartDetailsComponent },
      { path: 'carts', component: CartsComponent },
      { path: 'admin-orders', component: AdminOrdersComponent },
      { path: 'users', component: UsersComponent },
    ]
  },
  
  // Protected routes
  {
    path: '',
    canActivate: [() => canActivate()],
    children: [
      { path: 'orders', component: OrdersComponent },
      { path: 'carts', component: CartsComponent },
    ],
  },
  
  { path: '**', redirectTo: '' },
];

// Export the routes for standalone bootstrap
export const AppRoutingModule = RouterModule.forRoot(appRoutes);
