import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "../../services/apiCustomers";
import { useParams } from "react-router-dom";
export function useCustomer() {
  const customerid = useParams().customerID;
  const {
    data:{data:customer,foods }={},
    // data:data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customer",customerid],
    queryFn:()=> getCustomer(customerid),
  }); 
    const customerData={
      customer,
      foods,
    }
    
  return { customerData, isLoading, error };
}
