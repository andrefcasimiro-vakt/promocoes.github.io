export type Merchant = 'lidl' | 'pingodoce'

export interface Product {
    name: string;
    href: string;
    price: string;
    image: string;
    dateText: string;
    quantityInfo: string;
    merchant: Merchant;
}
