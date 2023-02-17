import styled from 'styled-components';

const overrides = `
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-block-start: 0px;
    margin-block-end: 0px;
`;

export const H1 = styled.h1`
    ${overrides}
    padding: 0px;
    margin: 0px;
    color: ${(props) => props.theme.colors.primary}
`;
export const H2 = styled.h2`
    ${overrides}
    color: ${(props) => props.theme.colors.primary}
`;
export const H3 = styled.h3`
    ${overrides}
    color: ${(props) => props.theme.colors.primary}
`;
export const H4 = styled.h4`
    ${overrides}
    color: ${(props) => props.theme.colors.primary}
`;
export const Text = styled.p`
    ${overrides}
    font-size: 12px;
    color: ${(props) => props.theme.colors.light};
    padding: 0px;
    margin: 0px;
`;

export const TextPrimary = styled(Text)`
    color: ${(props) => props.theme.colors.primary};
`;
