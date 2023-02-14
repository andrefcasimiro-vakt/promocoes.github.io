export type Merchant = 'lidl'

export interface Product {
    name: string;
    href: string;
    price: string;
    image: string;
    dateText: string;
    quantityInfo: string;
    merchant: Merchant;
}
