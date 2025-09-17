import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import PropTypes from "prop-types";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
function Stats({ customers ,orders}) {
  // 1.
  const numCustomers = customers.length;
  // 2.
  const sales = orders?.reduce(
    (total, order) => total + order.orderprice,
    0
  );
  // 3.
  const numOrders = orders.length;
  // 4.

  // const occupation =
  //   orders.reduce((acc, curr) => acc + curr.quantity, 0) /
  //   (numDays * cabinCount);
  // num checked in nights / all available nights (num days * num cabins)
  const ordersRate = (numOrders/numCustomers)*100;
  // num orders / num customers * 100 // orders rate by customer
  return (
    <>
      <Stat
        title="Customers"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numCustomers}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Orders"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numOrders}
      />
      <Stat
        title="Orders rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${ordersRate.toFixed(2)}%`}
      />
    </>
  );
}
Stats.propTypes = {
  customers: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
};

export default Stats;
