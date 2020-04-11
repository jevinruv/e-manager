import { CustomerCategoryPrice } from './customer-category-price';

export class CustomerCategory {
    
    id: number;
    name: string;
    createdDate: Date;
    customerCategoryPrices: CustomerCategoryPrice[] = [];

    constructor() {
        this.id = null;
        this.name = null;
        this.createdDate = null;
    }
}