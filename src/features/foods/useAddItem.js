import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {addItemToMenu} from "../../services/apiFood";

export function useAddItem(){
    const queryClient = useQueryClient();
    const{mutate:addItem,isLoading,error}=useMutation({
        mutationFn:addItemToMenu,
        onSuccess:()=>{
            toast.success("Item added successfully");
            queryClient.invalidateQueries({ active: true });
        },
        onError:()=>{
            toast.error("Couldn't add item");
        }
    })
    return {addItem,isLoading,error}
}