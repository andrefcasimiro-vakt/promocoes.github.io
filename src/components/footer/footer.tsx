import { atom, useAtom } from 'jotai';
import { useTheme } from 'styled-components';
import { PrimaryButton } from '../../styles/buttons.styled';
import { ColumnContainerExtraLarge } from '../../styles/layout.styled';
import GithubIcon from '../icons/github';
import { FooterContainer, GithubLink } from './footer.styled';

export const pageSizeAtom = atom<number>(100);
export const maxItemsAtom = atom<number>(100);

export default function Footer() {
    const theme = useTheme();

    const [pageSize, setPageSize] = useAtom(pageSizeAtom);
    const [maxItems, setMaxItems] = useAtom(maxItemsAtom);

    return (
      <FooterContainer>
        <ColumnContainerExtraLarge style={{ width: '300px' }}>
          <GithubLink
            style={{ flex: 1 }}
            href="https://github.com/andrefcasimiro-vakt/promocoes.github.io"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />

          </GithubLink>
        </ColumnContainerExtraLarge>
        <PrimaryButton style={{ width: '100%' }} onClick={() => setMaxItems((cur) => cur + pageSize)}>
          Ver mais produtos
        </PrimaryButton>

        <ColumnContainerExtraLarge style={{ width: '300px' }}>
          <PrimaryButton
            onClick={() => setPageSize(100)}
            style={{ flex: 1, background: pageSize === 100 ? theme.colors.primaryDark : theme.colors.primary }}
          >
            100 Produtos por página

          </PrimaryButton>
          <PrimaryButton
            onClick={() => setPageSize(500)}
            style={{ flex: 1, background: pageSize === 500 ? theme.colors.primaryDark : theme.colors.primary }}
          >
            500 Produtos por página

          </PrimaryButton>
          <PrimaryButton
            onClick={() => setPageSize(1000)}
            style={{ flex: 1, background: pageSize === 1000 ? theme.colors.primaryDark : theme.colors.primary }}
          >
            1000 Produtos por página

          </PrimaryButton>
        </ColumnContainerExtraLarge>
      </FooterContainer>
    );
}
