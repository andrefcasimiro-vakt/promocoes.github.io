import { useEffect, useState } from 'react';
import MerchantFilter from '../components/merchant-filter/merchant-filter';
import ProductTile from '../components/product-tile/product-tile';
import { Merchant, Product } from '../data/models';
import useData from '../hooks/useData';
import { PrimaryButton } from '../styles/buttons.styled';
import { H1, H3, H4 } from '../styles/font.styled';
import { TextInput } from '../styles/inputs.styled';
import { RowContainerLarge, ContainerCentered, Space, WrapContainerExtraLarge, ColumnContainerExtraLarge, HoizontalSpace } from '../styles/layout.styled';
import { sortByPrice } from '../utils/utils';

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [displayedItems, setDisplayedItems] = useState<Product[]>([])
  const [merchants, setMerchants] = useState<Merchant[]>(['lidl'])

  const { queryData } = useData()

  const handleSearch = async () => {
    const result = await queryData(inputValue, merchants)
    setDisplayedItems(() => result)
  }

  useEffect(() => {
    handleSearch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, merchants])

  const today = new Date()


  return (
    <ContainerCentered>
        <Space />
        <H1>PROMOÇÕES</H1>
        <H4>A mostrar promoções de hoje ({today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()})</H4>

      <ColumnContainerExtraLarge>
        <RowContainerLarge>
          <TextInput value={inputValue} onChange={(ev) => setInputValue(ev.target.value)} placeholder="Ex. Batata doce, Café Delta, Vinhos"/>
          <PrimaryButton>Pesquisar</PrimaryButton>
        </RowContainerLarge>
        <Space />
        <RowContainerLarge>
          <MerchantFilter
            merchantName="Lidl"
            merchantValue="lidl"
            setMerchants={setMerchants} 
            key="lidl"
            checked={merchants.includes('lidl')}
          />
          <HoizontalSpace />
          <MerchantFilter
            merchantName="Pingo Doce"
            merchantValue="pingodoce"
            setMerchants={setMerchants} 
            key="pingodoce"
            checked={merchants.includes('pingodoce')}
          />
        </RowContainerLarge>
      </ColumnContainerExtraLarge>

      <WrapContainerExtraLarge>
        {sortByPrice(displayedItems).map((item, index) => (
          <ProductTile product={item} key={index.toString()} />
        ))}
      </WrapContainerExtraLarge>

    </ContainerCentered>
  );
}
