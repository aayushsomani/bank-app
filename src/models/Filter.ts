import { Category } from './../constants/contents/BankContents';
export class Filter {
    constructor() {
        this.value = "";
    }
    value: any;
    category?: Category;
}