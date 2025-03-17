import { HttpClient } from '@angular/common/http';
import { Injectable, inject, model } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);
  constructor() { }

  getProducts(){
    return this.http.get<Product[]>(environment.apiUrl + '/product');
  }

  getProductById(id:string){
    return this.http.get<Product>(environment.apiUrl + '/product/'+id);
  }

  addProduct(model: Product){
    return this.http.post(environment.apiUrl + '/product', model)
  }

  updateProduct(id: string,model: Product){
    return this.http.put(environment.apiUrl + '/product/'+id, model);
  }

  deleteProductById(id:string){
    return this.http.delete(environment.apiUrl + '/product/'+id);
  }
}
