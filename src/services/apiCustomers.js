import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";
export async function getCustomers(page) {

    let query = supabase.from('customers').select('*',{
        count: "exact",
    }).order("customerid");
    const {data:customers} = await query
    
    // Pagination
    if (page) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        query = query.range(from, to);}
    const {data,count,error} = await query
    if(error){
        console.error(error);
        throw new Error("Customers could not be fetched");
    } 

    return {data,customers,count};
}

export async function getCustomer(customerid){
    const {data,error} = await supabase.from('customers')
    .select('* , orders(*)')
    .eq('customerid',customerid).single();
    if(error) throw new Error("Customer could not be fetched");
    const {orders} = data;
    const {data:foods , foodsError} =await supabase.from('foods').select('*').in('foodid',orders.map(order => order.foodid));
    if(foodsError) throw new Error("Foods could not be fetched");;
    
    return {data,foods};
}

export async function deleteCustomer(customerid){
    const {error} = await supabase.from('customers').delete().eq('customerid',customerid);
    if(error) throw new Error("Customer could not be deleted");
    return true;
}
export async function editCustomer(newCustomerData,customerid){
    const {data,error} = await supabase.from('customers').update({...newCustomerData})
    .eq('customerid',customerid).select()
    .single();
    if(error) throw new Error("Customer could not be edited");
    console.log(data);
    return data;
}