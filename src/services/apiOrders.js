
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getOrders(page){
 
    let query = supabase.from('orders').select('* , customers(fullname) , foods(name,unitprice)',{
        count: "exact",
    }).order("orderdate");
    const {data:orders} = await query
    // Pagination
    if (page) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        query = query.range(from, to);}
    const {data,count,error} = await query
    if(error){
        console.error(error);
        throw new Error("Cannot fetch orders");
    }     
    return {data,orders,count};
}
export async function getTodayOrders(){
    const {data:orders,error,count} = await supabase.from('orders').select('* , customers(fullname) , foods(name,unitprice)',{
        count: "exact",
    }).order("orderdate").eq("orderdate",new Date().toISOString().split("T")[0]);
    if(error){
        console.error(error);
        throw new Error("Cannot fetch orders");
    }     
    return {orders,count};
}