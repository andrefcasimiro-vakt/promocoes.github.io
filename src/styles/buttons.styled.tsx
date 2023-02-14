import styled from "styled-components";

export const PrimaryButton = styled.button`
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.light};
    padding: ${props => props.theme.spacing.small};
    cursor: pointer;
    border: none;

    transition: 0.1s ease-in-out;

    :hover {
        background: ${(props) => props.theme.colors.primaryDark};
    }

    font-size: ${props => props.theme.fontSize.default};
    font-family: inherit;
`
export const SecondaryButton = styled(PrimaryButton)`
    background: ${(props) => props.theme.colors.secondary};

    :hover {
        background: ${(props) => props.theme.colors.secondaryDark};
    }
`
