import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
export function useOrders() {
    const queryClient = useQueryClient();
      // Pagination
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: orders,orders:allOrders, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", page],
    queryFn:()=> getOrders(page),
  });
  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["orders", page + 1],
      queryFn: () => getOrders(page + 1),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["orders", page - 1],
      queryFn: () => getOrders(page - 1),
    });
  return {allOrders, orders,count, isLoading, error };
}
