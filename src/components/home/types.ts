import { IProductItem } from "../admin/products/types"

export interface ICategoryItem {
    id: number,
    name: string,
    image: string
};

export interface ICarousel {
    img: string
}

export interface IProductHomePage {
    products: Array<IProductItem>
    pages: number;
    currentPage: number;
    total: number;
    categoryName: string;
}