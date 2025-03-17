import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);
  constructor() { }
  
  getNewProducts(){
    return this.http.get<Product[]>(environment.apiUrl + '/customer/new-product');
  }
  
  getFeaturedProducts(){
    return this.http.get<Product[]>(environment.apiUrl + '/customer/featured-product');
  }
}
