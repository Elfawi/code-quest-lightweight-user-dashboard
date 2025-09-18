import { useQuery } from "@tanstack/react-query";
import { getCategory} from "../../services/apiFood";
import { useParams } from "react-router-dom";
export function useFoodCategory() {
const {categoryName}=useParams();
  const {
    data: foodCategory,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category",categoryName],
    queryFn:()=> getCategory(categoryName),
  });
  return { foodCategory, isLoading, error };
}
