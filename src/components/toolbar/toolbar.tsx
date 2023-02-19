/* eslint-disable max-len */
import { atom, useAtom } from 'jotai';
import { useTheme } from 'styled-components';
import { loadingAtom } from '../../containers/app';
import { H3 } from '../../styles/font.styled';
import { TextInput } from '../../styles/inputs.styled';
import { RowContainer, RowContainerLarge } from '../../styles/layout.styled';
import FiltersMenu from '../filters-menu/filters-menu';
import SearchIcon from '../icons/search';
import { ToolbarContainer } from './toolbar.styled';

export const searchAtom = atom('');

export default function Toolbar() {
    const theme = useTheme();
    const [searchValue, setSearchValue] = useAtom(searchAtom);

    const [loading, setLoading] = useAtom(loadingAtom);

    return (
      <ToolbarContainer>
        <H3 style={{ color: theme.colors.light }}>Promoções</H3>

        <RowContainer style={{ width: '100%' }}>
          <RowContainerLarge style={{ position: 'relative' }}>
            <TextInput
              style={{ paddingLeft: 40 }}
              value={searchValue}
              onChange={(event) => {
                  setLoading(true);

                  setSearchValue(event.target.value);

                  window.scrollTo({ top: 0 });
              }}
              placeholder="Ex. Batata doce, Café Delta, Vinhos"
            />
            <SearchIcon style={{ position: 'absolute', fill: theme.colors.primary, left: 10 }} />
          </RowContainerLarge>

          <FiltersMenu />
        </RowContainer>
      </ToolbarContainer>
    );
}
