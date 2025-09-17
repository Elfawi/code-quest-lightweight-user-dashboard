import { useQuery } from "@tanstack/react-query";
import { getFoods } from "../../services/apiFood";
export function useFoods() {
  const {
    data: foods,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn:()=> getFoods(),
  });
  return { foods, isLoading, error };
}
