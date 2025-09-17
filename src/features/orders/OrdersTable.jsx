import Spinner from "../../ui/Spinner";
import { useOrders } from "./useOrders";
import Table from "../../ui/Table";
import OrderRow from "./OrderRow";
import Empty from '../../ui/Empty';
import Pagination from "../../ui/Pagination";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
function OrdersTable({search}) {
  const { orders,allOrders, isLoading,count } = useOrders();  

  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
  ? 1
  : Number(searchParams.get("page"));

  const customerNameFilter= (order)=>
    order.customers.fullname.toLowerCase().includes(search.toLowerCase())
  const foodNameFilter = (order)=>
    order.foods.name.toLowerCase().includes(search.toLowerCase())
  const orderidFilter = (order)=>
    order.orderid.toString().includes(search.toLowerCase())
  let filterdOrders  = allOrders?.filter(order => customerNameFilter(order) || foodNameFilter(order) || orderidFilter(order));
  
  const filterdOrdersCount = filterdOrders?.length;
  if (isLoading) {
    return <Spinner />;
  }
  if (!orders?.length) return <Empty resourceName="orders" />;

  const dataToShow = search ? filterdOrders.slice((currentPage-1) * PAGE_SIZE, currentPage * PAGE_SIZE) : orders
 console.log(dataToShow);
 
  return (
      <Table columns="0.2fr 2fr 2fr 1.4fr 0.5fr 1.6fr 1.2fr 1fr">
        <Table.Header>
          <div>id</div>
          <div>Customer</div>
          <div>food name</div>
          <div>unit price</div>
          <div>quantity</div>
          <div>total price</div>
          <div>date</div>
          <div>status</div>
          {/* <div></div> */}
        </Table.Header>
        <Table.Body
          // data={search ? filterdOrders : orders}
          data={dataToShow}
          render={(order) => <OrderRow order={order} key={order.id} />}
        />
        <Table.Footer>
          <Pagination count={search ? filterdOrdersCount : count} />
        </Table.Footer>
      </Table>
  );
}
OrdersTable.propTypes = {
  search: PropTypes.string.isRequired,
};

export default OrdersTable;
