import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useState } from "react";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: auto 1fr;
  @media (max-width: 1100px) {
    display: block;
  }
`;

const Main = styled.main`
  padding: 3rem 3.4rem 4.4rem;
  background-color: var(--color-grey-50);
  overflow-y: scroll;
  scrollbar-width: none;
  @media (max-width: 1100px) {
    padding: 2rem 2.8rem 3.4rem;
  }
  @media (max-width: 900px) {
    padding: 1rem 1.8rem 2.4rem;
  }
  @media (max-width: 800px) {
    padding: 1rem;
    height: 100vh;
  }
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media (max-width: 1100px) {
    gap: 2.4rem;
  }
  @media (max-width: 800px) {
    gap: 1.2rem;
  }
`;
function AppLayout() {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  return (
    <StyledAppLayout>
      <Header setIsMobileNavActive={setIsMobileNavActive} />
      <Sidebar isMobileNavActive={isMobileNavActive} />
      <Main onClick={() => setIsMobileNavActive(false)}>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
