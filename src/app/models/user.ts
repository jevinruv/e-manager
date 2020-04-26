export class User {
    
    id: number;
    name: string;
    email: string;
    // username: string;
    password: string;
    type: string;
    phone: string;

    companyName: string;
    companyAddress: string;
    companyCity: string;
    companyProvince: string;
    companyPhone: string;

    constructor() {
        this.id = null;
        this.name = null;
        this.email = null;
        // this.username = null;
        this.password = null;
        this.type = null;
        this.phone = null;

        this.companyName = null;
        this.companyAddress = null;
        this.companyCity = null;
        this.companyProvince = null;
        this.companyPhone = null;
    }
}