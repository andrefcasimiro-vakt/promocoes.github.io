import styled from 'styled-components';

export const FilterContainer = styled.div`
    background: ${(props) => props.theme.colors.primary};
    position: absolute;
    top: 40px;
    right: 0px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100px;
`;
