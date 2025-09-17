import styled from "styled-components";
import DarkModeToggle from "./DarkModeToggle";
import MobileNavButton from "./MobileNavButton";
import Logout from "../features/authentication/Logout"
import PropTypes from "prop-types";
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

function HeaderMenu({setIsMobileNavActive}) {
  return (
    <StyledHeaderMenu>
      <li>
      <MobileNavButton onClick={()=>setIsMobileNavActive(prev => !prev)}/>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li><Logout /></li>
    </StyledHeaderMenu>
  );
}

HeaderMenu.propTypes = {
  setIsMobileNavActive: PropTypes.func.isRequired,
};
export default HeaderMenu;
