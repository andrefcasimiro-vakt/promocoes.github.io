import styled from 'styled-components';

export const ScrollToContainer = styled.div`
    position: fixed;
    left: 0;
    top: 50%;
    display: flex;
    flex-direction: column;
    z-index: ${(props) => props.theme.zIndexes.scrollButton};
`;
