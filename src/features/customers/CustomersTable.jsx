import Spinner from "../../ui/Spinner";
import { useCustomers } from "./useCustomers";
import Table from "../../ui/Table";
import CustomerRow from "./CustomerRow";
import Empty from '../../ui/Empty';
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { PAGE_SIZE } from "../../utils/constants";
function CustomersTable({search}) {
  const { customers,allCustomers, isLoading,count } = useCustomers();
  const [searchParams] = useSearchParams();  
  if (isLoading) {
    return <Spinner />;
  }
  if (!customers?.length) return <Empty resourceName="customers" />;
  const customerNameFilter= (customer)=>
    customer.fullname.toLowerCase().includes(search.toLowerCase())
  const customeridFilter = (customer)=>
    customer.customerid.toString().includes(search.toLowerCase())
  let filterdCustomers= allCustomers?.filter(customer => customerNameFilter(customer) || customeridFilter(customer));
  const filterdCustomerCount = filterdCustomers?.length;
  const currentPage = !searchParams.get("page")
  ? 1
  : Number(searchParams.get("page"));


  const dataToShow =  search ? filterdCustomers.slice((currentPage-1) * PAGE_SIZE, currentPage * PAGE_SIZE) : customers;
  return (
      <Table columns="0.3fr 1.8fr 2.2fr 1.4fr 1fr 1fr 1.6fr 0.3fr">
        <Table.Header>
          <div>id</div>
          <div>Full Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Country</div>
          <div>City</div>
          <div>Street</div>
        </Table.Header>
        <Table.Body
          // data={search ? filterdCustomers.slice(0,10) : customers}
          data={dataToShow}
          render={(customer) => <CustomerRow customer={customer} key={customer.customerid} />}
        />
        <Table.Footer>
          <Pagination count={search ? filterdCustomerCount : count} />
        </Table.Footer>
      </Table>
  );
}
CustomersTable.propTypes = {
  search: PropTypes.string.isRequired,
};

export default CustomersTable;
