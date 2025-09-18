import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useEditCustomer } from "./useEditCustomer";
import PropTypes from "prop-types";
function CustomerForm({ customer, onCloseModal }) {
  console.log(customer);
  const { editCustomer, isEditing } = useEditCustomer();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      ...customer
    },
  });
  const { errors } = formState;
  function onSubmit(data) {
    console.log(data);
    editCustomer({
      ...data,
      customerid: customer.customerid,
    });
    onCloseModal?.();
  }
  function onError(errors) {
    // console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
      <FormRow label="Full name" error={errors?.fullname?.message}>
        <Input
          id="fullname"
          type="text"
          {...register("fullname", { required: "this field is required" })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Phone" error={errors?.phone?.message}>
        <Input
          type="tel"
          id="phone"
          {...register("phone", {
            required: "this field is required",
          })}
        />
      </FormRow>
      <FormRow label="Country" error={errors?.country?.message}>
        <Input
          type="text"
          id="country"
          {...register("country", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="City" error={errors?.city?.message}>
        <Input
          type="text"
          id="city"
          {...register("city", {
            required: "this field is required",
          })}
        />
      </FormRow>
      <FormRow label="Street" error={errors?.street?.message}>
        <Input
          type="text"
          id="street"
          {...register("street", {
            required: "this field is required",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isEditing}>Edit Customer</Button>
      </FormRow>
    </Form>
  );
}
CustomerForm.propTypes = {
  customer: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func,
};
export default CustomerForm;
