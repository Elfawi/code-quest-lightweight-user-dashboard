import styled from "styled-components";
import PropTypes from "prop-types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { formatCurrency } from "../../utils/helpers";
import { HiTrash } from "react-icons/hi2";
import { useDeleteFood } from "./useDeleteFood";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const StyledFood = styled.div`
border-radius: var(--border-radius-lg);
overflow: hidden;
color:var(--color-grey-800);
border-radius:var(--border-radius-lg);
padding:1.2rem ;
display:flex ;
flex-direction:column ;
gap:1.4rem ;
cursor:pointer ;
position:relative ;
&:hover button{
    display:block ;
}
`;
const Image = styled.img`
width:100%;
border-radius:var(--border-radius-lg) ;
transition: all 0.3s ease-in-out;
filter:grayscale(0.5) ;
&:hover{
    transform: scale(1.1);
    filter:grayscale(0);
}
`;
const DeleteButton = styled.button`
    display:none ;
    background-color: var(--color-red-500);
    border:none ;
    border-radius: var(--border-radius-md);
    padding: 0.5rem 1rem;
    cursor: pointer;    
    position:absolute;
    top:2rem;
    right:2rem;
    background-color:var(--color-red-100);
    & svg{
        color:var(--color-red-700);
}
`;
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
    const {name,description,image,ingredients,unitprice,foodid}= food;
    const foodRef = useRef();

    const {deleteFood,isLoading:isDeleting} = useDeleteFood();
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
        <Image loading="lazy" src={image} alt={name}></Image>
        <Modal>
        <Modal.Open opens="delete">

        <DeleteButton disabled={isDeleting} aria-label="button"><HiTrash/></DeleteButton>
        </Modal.Open>
        <Modal.Window name="delete">
        <ConfirmDelete
            resourceName="food"
            id={foodid}
            name={name}
            onConfirm={() => deleteFood(foodid)}
          />
        </Modal.Window>
        </Modal>
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
    food: PropTypes.object,
}

export default Food
