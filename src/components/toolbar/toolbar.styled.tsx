import styled from 'styled-components';

export const ToolbarContainer = styled.nav`
    display: flex;
    position: fixed;
    z-index: ${(props) => props.theme.zIndexes.navbar};
    top: 0px;
    left: 0px;
    right: 0px;
    height: 30px;
    padding: ${(props) => props.theme.spacing.small};
    background: ${(props) => props.theme.colors.primary};
    justify-content: space-between;
    align-items: center;

    @media only screen and (max-width: 600px) {
        min-width: unset;
        height: unset;
        flex-direction: column;
    }
`;
