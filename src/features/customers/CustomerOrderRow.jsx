import styled, { css } from "styled-components";
import Table from "../../ui/Table";
import PropTypes from "prop-types";
import Heading from "../../ui/Heading";
import { formatCurrency } from "../../utils/helpers";
import { format } from "date-fns";

const variations = {
  pending: css`
    color: var(--color-silver-600);
    background: var(--color-silver-0);
    border: 1px solid var(--color-grey-200);
  `,
  completed: css`
    color: var(--color-green-700);
    background-color: var(--color-green-100);
    border: 1px solid var(--color-grey-200);
  `,
  cancelled: css`
    background-color: var(--color-red-100) ;
    border: 1px solid var(--color-grey-200);
    color: var(--color-red-700);
  `,
};
const Name = styled.div`
  font-weight: 600;
`;

const Email = styled.div`
  font-weight: 500;
`;
const Phone = styled.div`
  font-weight: 500;
`;
const Country = styled.div`
  font-weight: 500;
`;
const OrderDate = styled.div`
  font-weight: 500;
`;
const Status = styled.div`
  font-weight: 600;
  border-radius:var(--border-radius-lg);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:0.3rem 0.6rem;
  /* opacity: 0.7; */
  ${(props) => variations[props.status]}
`;

function CustomerOrderRow({ order }) {
  const {
    orderid, 
    name,
    unitprice,
    quantity,
    orderprice,
    orderdate,
    status,
  } = order;
  return (
    <Table.Row role="row">
      <p>{orderid}</p>
    <Name>{name}</Name>
    <Email>{formatCurrency(unitprice)}</Email>
      <Phone>{quantity}</Phone>
      <Country>{formatCurrency(orderprice)}</Country>
      <OrderDate>{format(new Date(orderdate), "MMM dd yyyy")}</OrderDate>
      <Status status={status}>{status}</Status>
      </Table.Row>
  );
}

CustomerOrderRow.propTypes = {
  order: PropTypes.object.isRequired,
};
export default CustomerOrderRow;
