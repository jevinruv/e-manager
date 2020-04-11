export class EConsumption {
    
    id: number;
    consumptionPlanned: number;
    consumptionActual: number;
    consumptionPlannedCost: number;
    consumptionActualCost: number;
    weekNo: number;
    consumptionDate: Date;
    consumptionPlannedDate: Date;

    constructor() {
        this.id = null;
        this.consumptionPlanned = null;
        this.consumptionActual = null;
        this.consumptionPlannedCost = null;
        this.consumptionActualCost = null;
        this.weekNo = null;
        this.consumptionDate = null;
        this.consumptionPlannedDate = null;
    }
}