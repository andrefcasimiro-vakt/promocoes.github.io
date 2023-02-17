import styled from 'styled-components';

export const H1 = styled.h1`
    padding: 0px;
    margin: 0px;
    color: ${(props) => props.theme.colors.primary}
`;
export const H2 = styled.h2`
    color: ${(props) => props.theme.colors.primary}
`;
export const H3 = styled.h3`
    color: ${(props) => props.theme.colors.primary}
`;
export const H4 = styled.h4`
    color: ${(props) => props.theme.colors.primary}
`;
export const Text = styled.p`
    font-size: 12px;
    color: ${(props) => props.theme.colors.light};
    padding: 0px;
    margin: 0px;
`;

export const TextPrimary = styled(Text)`
    color: ${(props) => props.theme.colors.primary};
`;
