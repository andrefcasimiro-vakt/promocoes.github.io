import { useEffect, useState } from 'react';
import ProductTile from '../components/product-tile/product-tile';
import { Product } from '../data/models';
import useData from '../hooks/useData';
import { PrimaryButton } from '../styles/buttons.styled';
import { H1 } from '../styles/font.styled';
import { TextInput } from '../styles/inputs.styled';
import { RowContainerLarge, ContainerCentered, Space, WrapContainerExtraLarge } from '../styles/layout.styled';
import { sortByPrice } from '../utils/utils';

export default function App() {
  const [displayedItems, setDisplayedItems] = useState<Product[]>([])
  const { queryData } = useData()

  useEffect(() => {
    handleSearch('')
  }, [])
  
  const handleSearch = async (input: string) => {
    const result = await queryData(input)
    setDisplayedItems(() => result)
  }

  return (
    <ContainerCentered>
      <Space />
      <H1>PROMOÇÕES</H1>
      <Space />

      <RowContainerLarge>
        <TextInput onChange={(ev) => handleSearch(ev.target.value)} placeholder="Ex. Batata doce, Café Delta, Vinhos"/>
        <PrimaryButton>Pesquisar</PrimaryButton>
      </RowContainerLarge>

      <WrapContainerExtraLarge>
        {sortByPrice(displayedItems).map((item, index) => (
          <ProductTile product={item} key={index.toString()} />
        ))}
      </WrapContainerExtraLarge>

    </ContainerCentered>
  );
}
