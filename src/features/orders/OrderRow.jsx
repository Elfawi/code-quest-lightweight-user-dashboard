import styled, { css } from "styled-components";
import Table from "../../ui/Table";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import { format } from "date-fns";

const variations = {
  pending: css`
    color: var(--color-silver-600);
    background: var(--color-silver-0);
    border: 1px solid var(--color-grey-200);
  `,
  completed: css`
    color: var(--color-brand-700);
    background-color: var(--color-brand-100);
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
const ID = styled.div`
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
  opacity: 0.7;
  ${(props) => variations[props.status]}
`;

function OrderRow({ order }) {
  const {
    orderid,
    customers:{fullname},
    foods:{name,unitprice},
    quantity,
    orderprice, 
    orderdate,
    status,
  } = order;
  return (
    <Table.Row role="row">
      <ID>{orderid}</ID>
     <Name>{fullname}</Name>
     <Name>{name}</Name>
     <Email>{unitprice}</Email>
      <Phone>{quantity}</Phone>
      <Country>{formatCurrency(orderprice)}</Country>
      <OrderDate>{format(new Date(orderdate), "MMM dd yyyy")}</OrderDate>
      <Status status={status}>{status}</Status>
      </Table.Row>
  );
}

OrderRow.propTypes = {
  order: PropTypes.object.isRequired,
};
export default OrderRow;
