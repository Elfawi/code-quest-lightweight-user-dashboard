import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCustomers } from "../customers/useCustomers";
import { useOrders } from "../orders/useOrders";
import SalesChart from "./SalesChart";
import { useSearchParams } from "react-router-dom";
import TodayOrders from "../orders/TodayOrders";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: auto auto auto;
  gap: 2.4rem;
`;

function DashboardLayout() {

  const { allCustomers, isLoading: isLoadingCustomers } = useCustomers();
  const { allOrders, isLoading: isLoadingOrders } = useOrders();
  const [searchParmas] = useSearchParams();
  const numDays = !searchParmas.get("last")
  ? 7
  : Number(searchParmas.get("last"))
  if (isLoadingCustomers || isLoadingOrders)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        customers={allCustomers}
        orders={allOrders}
        cabinCount={10}
      />
      <TodayOrders />
      <SalesChart orders={allOrders} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
