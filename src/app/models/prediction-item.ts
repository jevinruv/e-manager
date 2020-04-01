export class PredictionItem {
    
    id: number;
    consumption: number;
    consumptionLower: number;
    consumptionUpper: number;
    consumptionDate: string;

    constructor() {
        this.id = null;
        this.consumption = null;
        this.consumptionLower = null;
        this.consumptionUpper = null;
        this.consumptionDate = null;
    }
}