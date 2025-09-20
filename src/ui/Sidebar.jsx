import { useRef } from "react";
import styled from "styled-components";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
// import Logo from "./Logo";
import MainNav from "./MainNav";
import PropTypes from "prop-types";
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media (max-width: 1100px) {
    ${(props) => props.isMobileNavActive ? {
      position:"fixed",
  backgroundColor:"var(--color-grey-0)",
  zIndex: 999,
  top:0,
  height:"100vh",
  width:"30%",
  gap: "6rem",
  boxShadow: "0 0 8px rgba(0,0,0,0.15)"

  } : {
    display: "none"
  }}

  }
  @media (max-width: 800px) {
    ${(props) => props.isMobileNavActive && {
  width:"50%",
  }
  }
  }
  @media (max-width: 500px) {
    ${(props) => props.isMobileNavActive && {
  width:"70%",
  }
  }
  }
`;
function Sidebar({isMobileNavActive}) {
  const sidebarRef = useRef();
  const sidebarAnimation = gsap.fromTo(
    sidebarRef.current,
    {
      opacity: 0,
      x: -200,
    },
    {
      opacity: 1,
      x: 0,
      ease: "elastic.out(0.5)",
      duration: 0.5,
      paused: true 
    }
  );
  useGSAP(() => {
    if (isMobileNavActive) {
      sidebarAnimation.play();
    } else {
      sidebarAnimation.reverse();
    }
    
    return () => sidebarAnimation.kill();
  }, [isMobileNavActive]); 

  return (
    <StyledSidebar ref={sidebarRef} isMobileNavActive={isMobileNavActive}>
      <div>Restaurant Name</div>
      <MainNav />
    </StyledSidebar>
  );
}
Sidebar.propTypes = {
isMobileNavActive: PropTypes.bool.isRequired,
}

export default Sidebar;
