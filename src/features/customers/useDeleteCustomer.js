
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCustomer as deleteCustomerApi } from "../../services/apiCustomers";
export function useDeleteCustomer() {

  const queryClient = useQueryClient();
  const {
    mutate: deleteCustomer,
    isDeleting,
    error,
  } = useMutation({
    mutationFn:(customerid)=> deleteCustomerApi(customerid),
    onSuccess:()=> { 
    toast.success("Customer deleted successfully");
    queryClient.invalidateQueries({
      queryKey: ["customers"],
    });
    },
    onError:()=> {
      toast.error("Customer deleted failed");
    }
  });
  return { deleteCustomer, isDeleting, error };
}
