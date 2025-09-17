import supabase from "./supabase";


export async function getFoods() {
    const {data:foods,error} = await supabase.from('foods').select('*');
    if(error) throw new Error("Cannot fetch foods");
    return foods;
}

export async function getCategories() {
    const {data:categories,error} = await supabase.from('foods').select('category');
    if(error) throw new Error("Cannot fetch categories");
    const uniqueCategories = [...new Set(categories.map(category => category.category))];
    return uniqueCategories;
}
export async function getCategory(categoryName) {
    const {data:category,error} = await supabase.from('foods').select('*').eq("category",categoryName.replace("_"," "));
    if(error) throw new Error("Cannot fetch category");
    return category;
}