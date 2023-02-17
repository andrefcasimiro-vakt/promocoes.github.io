import styled from 'styled-components';

export const TextInput = styled.input`
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.theme.fontSize.default};
    padding: ${(props) => props.theme.spacing.small};
    display: flex;
    width: 100%;
`;
