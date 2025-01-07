import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);
  constructor() { }

  getCategories(){
    return this.http.get('http://localhost:3000/category');
  }
}
