import Spinner from "../../ui/Spinner";
import { useCustomer } from "./useCustomer";
import Table from "../../ui/Table";
import CustomerOrderRow from "./CustomerOrderRow";
import Empty from '../../ui/Empty';
// import Pagination from "../../ui/Pagination";
import Heading from "../../ui/Heading";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowLeft } from "react-icons/hi2";
import { useMoveBack } from "../../hooks/useMoveBack";
import Row from "../../ui/Row";
function CustomerOrdersTable() {
  const { customerData, isLoading } = useCustomer();
  
  const customerName = customerData?.customer?.fullname;
  const {orders} = customerData?.customer || {};
  const {foods} = customerData || {};

  const ordersWithFood = orders?.map(order => {
    const food = foods.find(food => food.foodid === order.foodid);
    return {...order, ...food};
  });
  // const orderCount = orders?.length;
const back = useMoveBack();

if (isLoading) {
    return <Spinner />;
  }
  if (!orders?.length) return <Empty resourceName="orders" />;
  return (
    <>
    <Row type="horizontal">
    <Heading as="h2">{customerName} orders</Heading>
    <ButtonIcon onClick={back}> <HiArrowLeft /></ButtonIcon>
    </Row>
      <Table columns="0.3fr 1.8fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>id</div>
          <div>Food Name</div>
          <div>Unit Price</div>
          <div>Quantity</div>
          <div>Total Price</div>
          <div>Date</div>
          <div>Status</div>
          {/* <div></div> */}
        </Table.Header>
        <Table.Body
          data={ordersWithFood}
          render={(order) => <CustomerOrderRow order={order} key={order.orderid} />}
          />
        {/* <Table.Footer>
          <Pagination count={orderCount} />
        </Table.Footer> */}
      </Table>
          </>
  );
}

export default CustomerOrdersTable;
