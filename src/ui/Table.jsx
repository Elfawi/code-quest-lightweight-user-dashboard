import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createContext, useContext, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  grid-column: span 2; // for dashboar
  grid-row: 2; // for dashboard

  @media (max-width: 1100px) {
    grid-column: 1/-1;
    grid-row: auto; // for dashboard
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  &:hover {
    background-color: var(--color-grey-50);
    cursor: pointer;
  }
  @media (max-width: 600px) {
    column-gap: 2rem;
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  @media (max-width: 800px) {
    padding: 0.8rem 1.2rem;
    letter-spacing: 0.2px;
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
const TableContext = createContext({});
function Table({ columns, children }) {
  const tableRef = useRef();
  useGSAP(() => {
    gsap.fromTo(
      tableRef.current,
      { opacity: 0, y: -100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,

        ease: "ease.out(1.5)",
      }
    );
  });
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable ref={tableRef} role="table">
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
}
Table.propTypes = {
  columns: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
Header.propTypes = {
  children: PropTypes.node.isRequired,
};
function Row({ children, onClick }) {
  const rowRef = useRef();
  useGSAP(() => {
    gsap.fromTo(
      rowRef.current,
      { opacity: 0, y: -20, scaleY: 0.8 },
      {
        opacity: 1,
        y: 0,
        scaleY: 1,
        duration: 0.5,

        ease: "ease.out(1.5)",
      }
    );
  });
  const { columns } = useContext(TableContext);
  return (
    <StyledRow onClick={onClick} role="row" columns={columns} ref={rowRef}>
      {children}
    </StyledRow>
  );
}
Row.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}
Body.propTypes = {
  data: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
export default Table;
