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
import InfiniteScroll from "react-infinite-scroll-component";

const MAX_ITEMS_PER_PAGE = 250

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [displayedItems, setDisplayedItems] = useState<Product[]>([])
  const [merchants, setMerchants] = useState<Merchant[]>(['lidl'])

  const [pageSize, setPageSize] = useState(MAX_ITEMS_PER_PAGE)

  const { queryData } = useData()

  const handleSearch = async () => {
    const result = await queryData(inputValue, merchants, pageSize)
    setDisplayedItems(() => result)
  }

  useEffect(() => {
    setPageSize(MAX_ITEMS_PER_PAGE)

    handleSearch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, merchants])

  const today = new Date()

  return (
    <ContainerCentered>
        <Space />
        <H1>PROMOÇÕES</H1>
        <H4>A mostrar promoções de hoje ({today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()})</H4>
        <Space />

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
          <HoizontalSpace />
          <MerchantFilter
            merchantName="Continente"
            merchantValue="continente"
            setMerchants={setMerchants} 
            key="continente"
            checked={merchants.includes('continente')}
          />
          <HoizontalSpace />
        </RowContainerLarge>
      </ColumnContainerExtraLarge>

      <InfiniteScroll
        style={{ display: 'flex', flex: 1}}
        dataLength={displayedItems.length} //This is important field to render the next data
        next={() => {
          setPageSize(pageSize => pageSize + MAX_ITEMS_PER_PAGE)

          handleSearch()
        }}
        hasMore={true}
        loader={null}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={handleSearch}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}># 8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}># 8593; Release to refresh</h3>
        }
      >
              <WrapContainerExtraLarge>

        <div style={{ minHeight: "100vh", flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent:'center' }}>
          
          {sortByPrice(displayedItems).map((item, index) => (
                <ProductTile product={item} key={index.toString()} />
              ))}
        </div>
        </WrapContainerExtraLarge>
      </InfiniteScroll>

    </ContainerCentered>
  );
}
