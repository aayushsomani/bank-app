export class BankDto {
    constructor() {
        this.ifsc = "";
        this.bank_id = 0;
        this.branch = "";
        this.address = "";
        this.city = "";
        this.district = "";
        this.state = "";
        this.bank_name = "";
    }
    ifsc: string;
    bank_id: number;
    branch: string;
    address: string;
    city: string;
    district: string;
    state: string;
    bank_name: string;
}