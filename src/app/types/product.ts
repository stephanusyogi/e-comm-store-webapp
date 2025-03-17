export interface Product{
    _id? :string,
    name:string,
    shortDescription:string,
    description:string,
    price:Number,
    discount:string,
    images: string[],
    categoryId: string,
    brandId: string,
    isFeatured: boolean,
    isNewProduct: boolean
}