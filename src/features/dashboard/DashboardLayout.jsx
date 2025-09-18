import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCustomers } from "../customers/useCustomers";
import { useOrders } from "../orders/useOrders";
import SalesChart from "./SalesChart";
import { useSearchParams } from "react-router-dom";
import TodayOrdersTable from "./TodayOrdersTable";
import CategorySalesChart from "./CategorySalesChart";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  /* grid-template-rows: auto auto auto; */
  gap: 2.4rem;
  @media(max-width:1100px){
  grid-template-rows: auto auto auto;
}
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
      />
      <TodayOrdersTable />
      <CategorySalesChart orders={allOrders}/>
      <SalesChart orders={allOrders} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
