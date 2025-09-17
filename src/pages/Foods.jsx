import Spinner from "../ui/Spinner";
import { useFoodCategory } from "../features/foods/useFoodCategory";
import Food from "../features/foods/Food";
import ButtonIcon from "../ui/ButtonIcon";
import { useMoveBack } from "../hooks/useMoveBack";
import { HiArrowLeft } from "react-icons/hi2";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";


const StyledFoods = styled.div`
    display:grid;
gap: 2.4rem;
grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`
function Foods() {
    
    const {foodCategory,isLoading}= useFoodCategory();
    console.log(foodCategory)
    const back = useMoveBack();
    if(isLoading) return <Spinner/>
    return (
        <>
    <Row type="horizontal">
    <Heading as="h2">{foodCategory[0].category} Meals</Heading>
    <ButtonIcon onClick={back}> <HiArrowLeft /></ButtonIcon>
    </Row>
        <StyledFoods>
            {foodCategory.map(fCategory => <Food key={fCategory.foodid} food={fCategory}/>)}
        </StyledFoods>
        </>
    )
}

export default Foods
