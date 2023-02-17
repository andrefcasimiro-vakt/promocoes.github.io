import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import { Merchant } from '../../data/models';
import { PrimaryButton } from '../../styles/buttons.styled';
import { Text } from '../../styles/font.styled';
import MerchantFilter from '../merchant-filter/merchant-filter';
import { FilterContainer } from './filters-menu.styled';

export const merchantsAtom = atom<Merchant[]>(['lidl', 'pingodoce', 'continente']);

export default function FiltersMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [merchants, setMerchants] = useAtom(merchantsAtom);

    return (
      <div style={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
        <PrimaryButton onClick={() => setIsOpen(!isOpen)}>
          <Text style={{ fontWeight: 'bolder', fontSize: '20px' }}>{isOpen ? 'X' : ':'}</Text>
        </PrimaryButton>

        {isOpen && (
        <FilterContainer>
          <MerchantFilter
            merchantName="Lidl"
            merchantValue="lidl"
            setMerchants={setMerchants}
            key="lidl"
            checked={merchants.includes('lidl')}
          />
          <MerchantFilter
            merchantName="Pingo Doce"
            merchantValue="pingodoce"
            setMerchants={setMerchants}
            key="pingodoce"
            checked={merchants.includes('pingodoce')}
          />
          <MerchantFilter
            merchantName="Continente"
            merchantValue="continente"
            setMerchants={setMerchants}
            key="continente"
            checked={merchants.includes('continente')}
          />
        </FilterContainer>
        )}
      </div>
    );
}
