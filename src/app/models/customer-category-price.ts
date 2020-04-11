import { CustomerCategory } from './customer-category';

export class CustomerCategoryPrice {
    
    id: number;
    rangeId: number;
    consumptionRangeStart: number;
    consumptionRangeStop: number;
    energyCharge: number;
    fixedCharge: number;
    fuelAdjustmentCharge: number;
    reviewedDate: Date;
    forumQuestion: CustomerCategory = new CustomerCategory();

    constructor() {
        this.id = null;
        this.rangeId = null;
        this.consumptionRangeStart = null;
        this.consumptionRangeStop = null;
        this.energyCharge = null;
        this.fixedCharge = null;
        this.fuelAdjustmentCharge = null;
        this.reviewedDate = null;
    }
}