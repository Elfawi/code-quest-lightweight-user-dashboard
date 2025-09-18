import Table from "../../ui/Table";
import PropTypes from "prop-types";
function TodayOrderRow({order}) {
    const {orderid,customers:{fullname},foods:{name,unitprice},quantity,orderprice} = order;
    return (
        <Table.Row>
            <div>{orderid}</div>
            <div>{fullname}</div>
            <div>{name}</div>
            <div>{unitprice}</div>
            <div>{quantity}</div>
            <div>{orderprice}</div>
        </Table.Row>
    )
}
TodayOrderRow.propTypes = {
    order: PropTypes.object.isRequired,
}
export default TodayOrderRow
