export class MileStone {
    
    id: number;
    planned: number;
    actual: number;
    eConsumptionId: number;
    status: string;
    mileStoneDate: Date;

    constructor() {
        this.id = null;
        this.planned = null;
        this.actual = null;
        this.eConsumptionId = null;
        this.status = null;
        this.mileStoneDate = null;
    }
}