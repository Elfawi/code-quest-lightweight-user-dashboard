import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteFood as deleteFoodApi} from "../../services/apiFood";
import { useNavigate } from "react-router-dom";
export function useDeleteFood(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const{mutate:deleteFood,isLoading,error}=useMutation({
        mutationFn:(id)=>deleteFoodApi(id),
        onSuccess:()=>{
            toast.success("Food deleted successfully");
            queryClient.invalidateQueries({ active: true });
            navigate('/menu');
        },

        onError:()=>{
            toast.error("Couldn't delete food");
        }
    })
    return {deleteFood,isLoading,error}
}