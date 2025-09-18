import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayOrders } from "./useTodayOrders";
import Spinner from "../../ui/Spinner";
import TodayOrder from "./TodayOrder";
import { formatCurrency } from "../../utils/helpers";
const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  grid-column: 1 / -1;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;
  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoOrders = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;
const Total = styled.div`
  font-weight: 700;
  margin-top:1.6rem ;
`;
function TodayOrders() {
  const { orders, isLoading } = useTodayOrders();
  const totalOrders = orders?.reduce((acc, order) => acc + order.orderprice, 0);
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today orders</Heading>
      </Row>
      {!isLoading ? (
        orders?.length > 0 ? (
          <>
          <TodayList>
            {orders.map((order) => (
              <TodayOrder order={order} totalOrders={totalOrders} key={order.orderid} />
            ))}
          </TodayList>
          <Total>Total: {formatCurrency(totalOrders.toFixed(2))} - {orders.length} orders</Total> 
            </>
        ) : (
          <NoOrders>No orders today...</NoOrders>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayOrders;
