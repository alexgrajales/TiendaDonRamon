import { Product } from "./product";

export class Order {
    id: string;
    uid:string;
    products: Product[] = [];
    amount: number;
    totalProducts: number=0;    
    created_at: Date;
    constructor(){
        
    }
}

