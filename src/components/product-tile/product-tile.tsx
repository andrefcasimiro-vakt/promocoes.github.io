import { Text } from "../../styles/font.styled";
import LidlIcon from "../icons/lidl";
import { ProductLinkContainer, ProductCard, ProductImage, MerchantCard, NameCard, PriceCard } from "./product-tile.styled";

interface Props {
    product: any;
    key: string;
}

export default function ProductTile({ product, key }: Props) {
    const isLidl = product.merchant === 'lidl'

    let link, MerchantIcon

    if (isLidl) {
        link = 'https://www.lidl.pt' + product.href
        MerchantIcon = LidlIcon
    }

    return (
        <ProductLinkContainer href={link} target="_blank" rel="noreferrer">
            <ProductCard key={key}>
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
