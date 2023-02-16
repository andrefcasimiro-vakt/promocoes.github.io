import { Product } from "../../data/models";
import { Text } from "../../styles/font.styled";
import ContinenteIcon from "../icons/continente";
import LidlIcon from "../icons/lidl";
import PingoDoceIcon from "../icons/pingodoce";
import { ProductLinkContainer, ProductCard, ProductImage, MerchantCard, NameCard, PriceCard } from "./product-tile.styled";

interface Props {
    product: Product;
    key: string;
}

export default function ProductTile({ product, key }: Props) {
    const isLidl = product.merchant === 'lidl'
    const isPingoDoce = product.merchant === 'pingodoce'
    const isContinente = product.merchant === 'continente'

    let link, MerchantIcon

    if (isLidl) {
        link = 'https://www.lidl.pt' + product.href
        MerchantIcon = LidlIcon
    } else if (isPingoDoce) {
        link = product.href
        MerchantIcon = PingoDoceIcon
    } else if (isContinente) {
        link = product.href
        MerchantIcon = ContinenteIcon
    }

    return (
        <ProductLinkContainer href={link} target="_blank" rel="noreferrer">
            <ProductCard key={key} merchant={product.merchant}>
                <MerchantCard>
                    {
                        MerchantIcon && <MerchantIcon />
                    }
                </MerchantCard>
                <PriceCard>{product.price} €</PriceCard>
                <ProductImage backgroundImage={product.image}/>
                <NameCard>
                    <Text>{product.name}</Text>
                </NameCard>
            </ProductCard>
        </ProductLinkContainer>
    )
}
