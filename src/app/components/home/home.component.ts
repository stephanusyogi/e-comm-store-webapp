import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCardComponent, CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customerService=inject(CustomerService);
  newProducts: Product[] = [];
  featuredProducts: Product[] =[];
  bannerImages:Product[]=[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }


  ngOnInit(){
    this.customerService.getFeaturedProducts().subscribe((result)=>{
      this.featuredProducts = result;
      this.bannerImages.push(...result);
      console.log(this.featuredProducts);
    });
    this.customerService.getNewProducts().subscribe((result)=>{
      this.newProducts = result;
      this.bannerImages.push(...result);
      console.log(this.newProducts);
    });
  }
}
