import { PrimaryButton } from '../../styles/buttons.styled';
import ArrowIcon from '../icons/arrow-icon';
import { ScrollToContainer } from './scroll-to.styled';

export default function ScrollTo() {
    return (
      <ScrollToContainer>
        <PrimaryButton onClick={() => window.scrollTo({ top: 0 })}>
          <ArrowIcon />
        </PrimaryButton>
        <PrimaryButton onClick={() => window.scrollTo({ top: document.scrollingElement?.scrollHeight })}>
          <ArrowIcon style={{ transform: 'scaleY(-1)' }} />
        </PrimaryButton>
      </ScrollToContainer>
    );
}
