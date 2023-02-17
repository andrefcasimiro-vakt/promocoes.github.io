import {
 useEffect, useState,
} from 'react';
import MerchantFilter from '../components/merchant-filter/merchant-filter';
import ProductTile from '../components/product-tile/product-tile';
import { Merchant, Product } from '../data/models';
import useData from '../hooks/useData';
import { PrimaryButton } from '../styles/buttons.styled';
import { H1, H2, H4 } from '../styles/font.styled';
import { TextInput } from '../styles/inputs.styled';
import {
 RowContainerLarge,
 ContainerCentered,
 Space,
 WrapContainerExtraLarge,
 ColumnContainerExtraLarge,
 HorizontalSpace,
} from '../styles/layout.styled';
import { sortProductsByPrice } from '../utils/utils';

const today = new Date();

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [displayedItems, setDisplayedItems] = useState<Product[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>(['lidl']);

  const [loading, setLoading] = useState(true);

  const { queryData } = useData();

  const handleSearch = async () => {
    const result = await queryData(inputValue, merchants);

    setDisplayedItems(() => result);
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  useEffect(() => {
    handleSearch();
  }, [inputValue, merchants]);

  return (
    <ContainerCentered>
      <Space />
      <H1>PROMOÇÕES</H1>
      <H4>
        A mostrar promoções de hoje (
        {`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}
        )
      </H4>
      <Space />

      <ColumnContainerExtraLarge>
        <RowContainerLarge>
          <TextInput
            value={inputValue}
            onChange={(ev) => {
              setInputValue(ev.target.value);

              setLoading(true);
            }}
            placeholder="Ex. Batata doce, Café Delta, Vinhos"
          />
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
          <HorizontalSpace />
          <MerchantFilter
            merchantName="Pingo Doce"
            merchantValue="pingodoce"
            setMerchants={setMerchants}
            key="pingodoce"
            checked={merchants.includes('pingodoce')}
          />
          <HorizontalSpace />
          <MerchantFilter
            merchantName="Continente"
            merchantValue="continente"
            setMerchants={setMerchants}
            key="continente"
            checked={merchants.includes('continente')}
          />
          <HorizontalSpace />
        </RowContainerLarge>
      </ColumnContainerExtraLarge>

      <WrapContainerExtraLarge>
        {loading ? <H2>A pesquisar...</H2> : (
          <div style={{
          flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'center',
          }}
          >
            {sortProductsByPrice(displayedItems).map((item, index) => (
              <ProductTile product={item} key={index.toString()} />
              ))}
          </div>
        )}

      </WrapContainerExtraLarge>

    </ContainerCentered>
  );
}
