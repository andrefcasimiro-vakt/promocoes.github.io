import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${(props) => props.theme.spacing.small};
    height: 100%;
`;

export const ContainerCentered = styled(Container)`
    align-items: center;
`;

export const Space = styled.div`
    margin-top: ${(props) => props.theme.spacing.small};
`;

export const SpaceLarge = styled(Space)`
    margin-top: ${(props) => props.theme.spacing.large};
`;

export const HorizontalSpace = styled.div`
    margin-right: ${(props) => props.theme.spacing.extraSmall};
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const RowContainerLarge = styled(RowContainer)`
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`;

export const ColumnContainerExtraLarge = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const WrapContainerExtraLarge = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: ${(props) => props.theme.spacing.small};
`;
