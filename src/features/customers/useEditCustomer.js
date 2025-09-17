
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editCustomer as editCustomerApi } from "../../services/apiCustomers";
export function useEditCustomer() {

  const queryClient = useQueryClient();
  const {
    mutate: editCustomer,
    isLoading:isEditing,
    error,
  } = useMutation({
    mutationFn:({customerid,...newCustomerData})=> editCustomerApi({...newCustomerData},customerid),
    onSuccess:(data)=> { 
    toast.success(`Customer ${data.fullname} edited successfully`);
    queryClient.invalidateQueries({ active: true }); 
    },
    onError:()=> {
      toast.error("Customer edited failed");
    }
  });
  return { editCustomer, isEditing, error };
}
