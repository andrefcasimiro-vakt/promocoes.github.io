import styled from "styled-components"

export const ProductLinkContainer = styled.a`
    text-decoration: none;
`

export const ProductCard = styled.div<{ backgroundImage?: string; }>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: end;
    
    background-size: cover;
    background-position: center center;
    background-image: url('${props => props.backgroundImage}');

    border: 1px solid ${props => props.theme.colors.primary};

    width: 200px;
    height: 200px;
    margin: ${props => props.theme.spacing.small};

    transition: 0.2s ease all;

    :hover {
        transform: translate(0px, -2px);
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    }
`

export const NameCard = styled.div`
    position: relative;
    display: flex;
    font-weight: bold;
    color: #fff;
    padding: ${props => props.theme.spacing.extraSmall};
    transition: 0.2s ease all;

    background: ${props => props.theme.colors.primary};
`

export const ProductImage = styled.div<{ backgroundImage?: string; }>`
    display: flex;
    flex: 1;
    position: relative;
    background-size: cover;
    background-position: center center;
    background-image: url('${props => props.backgroundImage}');
`


export const PriceCard = styled.div`
    position: absolute;
    right: -1px;
    top: -1px;
    display: flex;
    background: red;
    font-weight: bold;
    color: #fff;
    padding: ${props => props.theme.spacing.extraSmall};
    z-index: 1;
`

export const MerchantCard = styled.div`
    position: absolute;
    left: -1px;
    top: -1px;
    display: flex;
    font-weight: bold;
    color: #fff;
    padding: ${props => props.theme.spacing.extraSmall};
    z-index: 1;
`
