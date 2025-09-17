import styled from "styled-components";
import PropTypes from "prop-types";
const StyledSearch = styled.input`
padding: 0.6rem;
border-radius: var(--border-radius-lg);
background-color:transparent ;
border: 1px solid var(--color-grey-200);
outline: none;
color: var(--color-grey-800);
width:45%;
transition: all 0.3s ease-in-out;
&:focus{
    width:50%;
}
@media (max-width: 1100px) {
  width:65%;
  &:focus{
    width:70%;
}
    }

@media (max-width: 600px) {
  font-size: 1rem;
}


`;

function Search({search,setSearch,placeholder}){
    return(
        <StyledSearch type="search" placeholder={placeholder} value={search} onChange={(e)=>setSearch(e.target.value)} />
    )
}
Search.propTypes = {
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
  };
export default Search; 