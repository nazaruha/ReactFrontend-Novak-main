export interface IProductCreate {
    name: string;
    priority: number;
    categoryId: number;
    price: number;
    description: string;
    ids: number[];
}

export interface IProductEdit {
    id: number,
    name: string;
    priority: number;
    categoryId: number;
    price: number;
    description: string;
    ids: number[];
}

export interface IProductImageItem { // for IProductEdit images
    id: string | number;
    name: string;
}

export interface IProductGetItem { // інформація про продукт який ми будем запрашувати
    id: number | string | undefined,
    name: string;
    priority: number;
    categoryId: number;
    price: number;
    description: string;
    images: IProductImageItem[];
}

export interface IProductItem {
    id: number,
    name: string,
    categoryName: string,
    priority: number,
    description: string,
    images: string[],
    price: number
}

export interface IProductSearchResult {
    products: Array<IProductItem>, // IProductItem[]
    pages: number,
    currentPage: number,
    total: number,
    categoryName: string
}

export interface IProductSearch {
    name: string;
    categorySlug: string;
    page: number | string;
}

export interface ICategorySelect {
    id: number,
    title: string;
    urlSlug: string;
}