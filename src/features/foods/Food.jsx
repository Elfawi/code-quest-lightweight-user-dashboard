import styled from "styled-components";
import PropTypes from "prop-types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { formatCurrency } from "../../utils/helpers";
// gsap.registerPlugin(useGSAP);

const StyledFood = styled.div`
border-radius: var(--border-radius-lg);
overflow: hidden;
/* background-color:var(--color-brand-200); */
color:var(--color-grey-800);
border-radius:var(--border-radius-lg);
padding:1.2rem 1.6rem ;
`;
const Image = styled.img`
width:100%;
border-radius:var(--border-radius-lg) ;
`
const Name = styled.h5`
font-weight:700 ;
`
const Price = styled.p`
font-weight:700 ;
`
const FoodHead = styled.div`
    display:flex ;
    justify-content:space-between ;
    align-items:center ;
`
const List = styled.ul`
display:flex ;
flex-direction:column ;
gap:1rem ;
`
const Ingred = styled.li`
    font-size:1.4rem ;
`
function Food({food}) {    

    const {name,description,image,ingredients,unitprice}= food;
    const foodRef = useRef();
    useGSAP(()=>{
        if(foodRef){
            gsap.fromTo(foodRef.current,{
                opacity:0,
                y:-100,
                scale:0.5
            }
            ,{
                opacity:1,
                scale:1,
                y:0,
                duration:0.5,
                ease:"power4.inOut"
            })
        }
    },[food])
    return (
        <StyledFood ref={foodRef}>
        <Image src={image} alt={name}></Image>
        <FoodHead>
        <Name>{name}</Name>
        <Price>{formatCurrency(unitprice)}</Price>
        </FoodHead>
        <List>
            <li>{description}</li>
            <ul>{ingredients.map(ing=> <Ingred key={ing}>{ing}</Ingred>)}</ul>
        </List>
        </StyledFood>
    )
}
Food.propTypes = {
    food: PropTypes.object.isRequired,
}

export default Food
