import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import PropTypes from "prop-types";
import { useAddItem } from "./useAddItem";
function AddItemForm({ onCloseModal }) {
  const { register, handleSubmit, formState } = useForm();
  const {addItem,isLoading:isAdding}=useAddItem();
  const { errors } = formState;
  function onSubmit(data) {
    const ingredients =data.ingredients.split(",").map(ingredient=>ingredient.trim());
    addItem({...data,ingredients});
    onCloseModal?.();
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow label="Food name" error={errors?.name?.message}>
        <Input
          id="name"
          type="text"
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>
      <FormRow label="Category" error={errors?.category?.message}>
        <Input
          type="text"
          id="category"
          {...register("category", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.unitprice?.message}>
        <Input
          type="number"
          id="unitprice"
          {...register("unitprice", {
            required: "this field is required",
          })}
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Input
          type="text"
          id="description"
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Ingredients (comma separated) ex(meat,cheese,egg)" error={errors?.ingredients?.message}>
        <Input
          type="text"
          id="ingredients"
          {...register("ingredients", {
            required: "this field is required",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isAdding}>Add Item</Button>
      </FormRow>
    </Form>
  );
}
AddItemForm.propTypes = {
  onCloseModal: PropTypes.func,
};
export default AddItemForm;
