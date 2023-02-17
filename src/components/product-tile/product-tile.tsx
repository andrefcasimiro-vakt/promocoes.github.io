import { Product } from '../../data/models';
import { Text } from '../../styles/font.styled';
import ContinenteIcon from '../icons/continente';
import LidlIcon from '../icons/lidl';
import PingoDoceIcon from '../icons/pingodoce';
import {
 ProductLinkContainer, ProductCard, ProductImage, MerchantCard, NameCard, PriceCard,
} from './product-tile.styled';

interface Props {
    product: Product;
}

export default function ProductTile({ product }: Props) {
    let link;
    let MerchantIcon;

    if (product.merchant === 'lidl') {
        link = `https://www.lidl.pt${product.href}`;
        MerchantIcon = LidlIcon;
    } else if (product.merchant === 'pingodoce') {
        link = product.href;
        MerchantIcon = PingoDoceIcon;
    } else if (product.merchant === 'continente') {
        link = product.href;
        MerchantIcon = ContinenteIcon;
    }

    return (
      <ProductLinkContainer href={link} target="_blank" rel="noreferrer">
        <ProductCard merchant={product.merchant}>
          <MerchantCard>
            {MerchantIcon && <MerchantIcon />}
          </MerchantCard>
          <PriceCard>
            {product.price}
            {' '}
            €
          </PriceCard>
          <ProductImage backgroundImage={product.image} />
          <NameCard>
            <Text>{product.name}</Text>
          </NameCard>
        </ProductCard>
      </ProductLinkContainer>
    );
}
