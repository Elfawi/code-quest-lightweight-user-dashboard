import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import { format } from "date-fns";
const StyledTodayOrder = styled.div`
  font-size: 1.4rem;
  padding: 0.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  border-radius:var(--border-radius-lg) ;
  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
  &:hover{
    background-color: var(--color-grey-100);
    cursor:pointer;
  }
`;
const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(6,1fr);
  gap: 1.2rem;
`;
const Item = styled.li`
  font-size: 1.4rem;
  
  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

function TodayOrder({ order }) {
  const {status,orderprice,customers,foods,orderdate } = order;
  const {name} = foods;
  return (
    <StyledTodayOrder>
      <List>
        <Item>{customers.fullname}</Item>
        <Item>{name}</Item>
        <Item>{customers.phone}</Item>
        <Item>{status}</Item>
        <Item>{formatCurrency(orderprice)}</Item>
        <Item>{format(new Date(orderdate), "MMM dd yyyy")}</Item>
      </List>

</StyledTodayOrder>
  );
}
TodayOrder.propTypes = {
  order: PropTypes.object.isRequired,
};
export default TodayOrder;
