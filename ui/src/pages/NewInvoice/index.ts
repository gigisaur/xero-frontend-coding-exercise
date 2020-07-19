export * from "./NewInvoice";

export interface IFormValues {
    description: string;
    cost: number;
    quantity: number;
}

export interface IItem extends IFormValues {
    price: number;
}

export interface IInvoice {
    items: IItem[];
    totalCost: number;
}
