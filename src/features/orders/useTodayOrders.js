import { useQuery } from "@tanstack/react-query";
import { getTodayOrders } from "../../services/apiOrders";
export function useTodayOrders() {

  const {
    data: { orders,count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn:()=> getTodayOrders(),
  });
  return {orders,count, isLoading, error };
}
