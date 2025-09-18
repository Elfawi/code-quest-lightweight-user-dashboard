import styled from "styled-components";
import Table from "../../ui/Table";
import PropTypes from "prop-types";
import { HiTrash,HiEye,HiPencil } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import { useDeleteCustomer } from "./useDeleteCustomer";
import CustomerForm from "./CustomerForm";
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import { useNavigate } from "react-router-dom";
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
const City = styled.div`
  font-weight: 500;
`;
const Street = styled.div`
  font-weight: 500;
`;
function CustomerRow({ customer,onClick }) {
  const {
    customerid,
    fullname,
    email,
    phone,
    country,
    city,
    street
  } = customer;
  const { isDeleting, deleteCustomer } = useDeleteCustomer();
  console.log(customerid)
const navigate = useNavigate();
  return (
    <Table.Row role="row" onClick={onClick}>
      <ID>{customerid}</ID>
     <Name>{fullname}</Name>
     <Email>{email}</Email>
      <Phone>{phone}</Phone>
      <Country>{country}</Country>
      <City>{city}</City>
      <Street>{street}</Street>      
      <Modal>
        <Menus>

      <Menus.Menu>
          <Menus.Toggle id={customerid}></Menus.Toggle>
          <Menus.List id={customerid}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/customers/${customerid}`)}
              >
              See orders
            </Menus.Button>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
              </Menus>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="customer"
            disabled={isDeleting}
            onConfirm={() => deleteCustomer(customerid)}
          />
        </Modal.Window>
        <Modal.Window name="edit">
          <CustomerForm
            customer={{
customerid,
fullname,
email,
phone,
country,
city,
street
            }}
          />
        </Modal.Window>
      </Modal>
      </Table.Row>
  );
}

CustomerRow.propTypes = {
  customer: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
export default CustomerRow;
