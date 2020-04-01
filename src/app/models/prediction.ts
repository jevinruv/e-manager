import { PredictionItem } from './prediction-item';

export class Prediction {
    
    id: number;
    frequency: string;
    duration: number;
    createdDate: Date;
    predictionItems: PredictionItem[] = [];

    constructor() {
        this.id = null;
        this.createdDate = null;
        this.frequency = null;
        this.duration = null;
    }
}