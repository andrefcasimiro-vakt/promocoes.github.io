import { Product } from '../data/models';

export const sortProductsByPrice = (items: Product[]): Product[] => items.sort((a, b) => Number(a.price) - Number(b.price));
