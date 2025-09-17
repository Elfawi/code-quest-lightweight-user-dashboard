import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomers } from "../../services/apiCustomers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
export function useCustomers() {
    const queryClient = useQueryClient();
      // Pagination
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: customers,customers:allCustomers, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers", page],
    queryFn:()=> getCustomers(page),
  });
  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["customers", page + 1],
      queryFn: () => getCustomers(page + 1),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["customers", page - 1],
      queryFn: () => getCustomers(page - 1),
    });
  return { customers,allCustomers,count, isLoading, error };
}
