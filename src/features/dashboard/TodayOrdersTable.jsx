import styled from "styled-components";
import Table from "../../ui/Table"
import TodayOrderRow from "./TodayOrderRow"
import { useTodayOrders } from "../dashboard/useTodayOrders";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";
const TODAY_ORDERS_TO_SHOW = 5;
const StyledTable = styled(Table)`
grid-column: 1 / -1;
`
function TodayOrdersTable() {
  const { orders, isLoading } = useTodayOrders();
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
  ? 1
  : Number(searchParams.get("page"));

   const dataToShow =orders?.slice((currentPage-1) * TODAY_ORDERS_TO_SHOW, currentPage * TODAY_ORDERS_TO_SHOW)
  if(isLoading) return <Spinner />

    return (
        <StyledTable columns="0.3fr 1.4fr 1.4fr 1fr 1fr 0.5fr ">
        <Table.Header>
            <div>ID</div>
            <div>Customer</div>
            <div>food name</div>
            <div>unit price</div>
            <div>quantity</div>
            <div>total price</div>
            </Table.Header>
        <Table.Body data={dataToShow} render={(order) => <TodayOrderRow key={order.orderid} order={order} />}></Table.Body>
        <Table.Footer>
            <Pagination count={orders.length} />
        </Table.Footer>
        </StyledTable>
    )
}

export default TodayOrdersTable
