import { CSSProperties } from 'styled-components';

interface Props {
    style?: CSSProperties
}
export default function ArrowIcon({ style }: Props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none" style={style}>
        <path d="M12 7V17M12 7L16 11M12 7L8 11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
}
