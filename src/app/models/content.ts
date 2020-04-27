import { ContentAttachment } from './content-attachment';

export class Content {
    
    id: number;
    email: string;
    text: string;
    createdDate: Date;
    contentAttachments = [];

    constructor() {
        this.id = null;
        this.email = null;
        this.text = null;
        this.createdDate = null;
    }
}