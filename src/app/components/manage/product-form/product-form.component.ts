import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../types/brand';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatInputModule, CommonModule, MatButtonModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  formBuilder=inject(FormBuilder);
  productForm=this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured:[false],
    isNewProduct:[false]
  })
  
  brandService=inject(BrandService);
  categoryService=inject(CategoryService);
  productService=inject(ProductService);

  brands:Brand[]=[];
  categories:Category[]=[]

  router=inject(Router);
  route=inject(ActivatedRoute);

  id!:string;

  ngOnInit(){
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });

    this.brandService.getBrand().subscribe((result) => {
      this.brands = result;
    });

    this.id=this.route.snapshot.params['id'];
    if (this.id) {
      this.productService.getProductById(this.id).subscribe((result)=>{
        for (let index = 0; index < result.images.length; index++) {
          this.addImage();
        }
        this.productForm.patchValue(result as any);
      })
    }else{
      this.addImage();
    }
  }

  addProduct(){
    let value = this.productForm.value;
    this.productService.addProduct(value as any).subscribe({
      next: (result) =>{
        alert("Product Added.");
        this.router.navigateByUrl("/admin/products")
      },
      error: (error) => {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please check your input.');
      }
    })
  }

  updateProduct(){
    let value = this.productForm.value;
    this.productService.updateProduct(this.id, value as any).subscribe({
      next: (result) =>{
        alert("Product Updated.");
        this.router.navigateByUrl("/admin/products")
      },
      error: (error) => {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please check your input.');
      }
    })
  }

  addImage(){
    this.images.push(this.formBuilder.control(null));
  }

  removeImage(){
    this.images.removeAt(this.images.controls.length-1)
  }

  get images(){
    return this.productForm.get('images') as FormArray;
  }
}
