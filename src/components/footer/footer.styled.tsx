import styled from 'styled-components';

export const FooterContainer = styled.footer`
    display: flex;
    background: ${(props) => props.theme.colors.light};
    height: 200px;
    flex-direction: row;
`;

export const GithubLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.light};
    padding: ${(props) => props.theme.spacing.small};
    cursor: pointer;
    border: none;

    transition: 0.1s ease-in-out;

    :hover {
        background: ${(props) => props.theme.colors.primaryDark};
    }

    font-size: ${(props) => props.theme.fontSize.default};
    font-family: inherit;
`;

