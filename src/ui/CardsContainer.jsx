import styled from "styled-components";
import PropTypes from "prop-types";
const StyledCardsContainer = styled.div`
display: grid;
gap: 2.4rem;
grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));

`;
function CardsContainer({children}) {
    return (
        <StyledCardsContainer>
            {children}
        </StyledCardsContainer>
    )
}

CardsContainer.propTypes ={
    children:PropTypes.node,
}
export default CardsContainer
