import { useRef, useState } from "react";
import { useCategories } from "../features/foods/useCategories";
import { useFoods } from "../features/foods/useFoods";
import Card from "../ui/Card";
import CardsContainer from "../ui/CardsContainer";
import Empty from "../ui/Empty";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Search from "../ui/Search";
import Spinner from "../ui/Spinner";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate, useSearchParams } from "react-router-dom";

function Menu() {
  const {foods,isLoading} = useFoods();
  const [searchParams,setSearchParams] = useSearchParams();

  const {categories,isLoadingCategories} = useCategories();
  const navigate = useNavigate();
const foodImages = Array.from(new Set(foods?.map(food=>food.image)));
const categoryImages = categories?.map((category,i)=>{
  return {category,image:foodImages[i]};
});
    const headingRef = useRef();
    const [search,setSearch] = useState('');
    useGSAP(()=>{
      if(headingRef){
        gsap.fromTo(
          headingRef.current,
          {opacity:0,y:-50, scale:0.5},
          {
            opacity:1,
            y:0,
            scale:1,
            duration:0.5,
            ease:"power4.inOut"
          }
    )}
    })
    if (isLoading || isLoadingCategories) 
      return <Spinner />;
    if (!foods?.length) return <Empty resourceName="foods" />;
  return <>
  <Row type="horizontal">
    <Heading as="h1" ref={headingRef}>Menu</Heading>
    <Search search={search} setSearch={setSearch} placeholder="Search by category name"/>
  </Row>
  <CardsContainer>
    {categoryImages?.map((category,i)=>(
      <Card onClick={() =>{
        navigate(`/menu/${category.category.replace(" ","_")}`)
      }
      }
      key={i} category={category.category}image={category.image} />
    ))}
  </CardsContainer>
  </>
}

export default Menu;
