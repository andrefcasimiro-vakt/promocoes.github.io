import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { merchantsAtom } from '../components/filters-menu/filters-menu';
import Footer, { maxItemsAtom } from '../components/footer/footer';
import ProductTile from '../components/product-tile/product-tile';
import ScrollTo from '../components/scroll-to/scroll-to';
import Toolbar, { searchAtom } from '../components/toolbar/toolbar';
import { Product } from '../data/models';
import useData from '../hooks/useData';
import { H2 } from '../styles/font.styled';
import {
 ContainerCentered,
 Space,
 WrapContainerExtraLarge,
} from '../styles/layout.styled';

export const loadingAtom = atom<boolean>(true);

export default function App() {
  const [displayedItems, setDisplayedItems] = useState<Product[]>([]);

  const [loading, setLoading] = useAtom(loadingAtom);
  const [searchValue] = useAtom(searchAtom);
  const [merchants] = useAtom(merchantsAtom);
  const [maxItems] = useAtom(maxItemsAtom);

  const { queryData } = useData();

  const handleSearch = async () => {
    const result = await queryData(searchValue, merchants, maxItems);

    setDisplayedItems(() => result);
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue, merchants, maxItems]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  return (
    <ContainerCentered style={{ padding: 0, paddingTop: 40 }}>
      <Toolbar />
      <ScrollTo />
      <Space style={{ marginTop: 40 }} />
      <WrapContainerExtraLarge style={{ padding: 0, width: '100%' }}>
        {loading
          ? <H2>A pesquisar...</H2>
          : (
            <div style={{
 minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%',
}}
            >
              <div style={{
 flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%',
}}
              >
                {displayedItems.map((item, index) => (
                  <ProductTile product={item} key={index.toString()} />
              ))}
              </div>
              <Space />
              <Footer />

            </div>
        )}

      </WrapContainerExtraLarge>

    </ContainerCentered>
  );
}
