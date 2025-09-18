import styled from "styled-components";
import PropTypes from "prop-types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
// gsap.registerPlugin(useGSAP);
const P = styled.p`
position: absolute;
top:3rem;
left:7rem;
text-align: center;
width:100%;
height:3rem;
font-size: 1.4rem;
font-weight: 600;
transform: rotate(45deg) ;
transition: top 0.3s ease-in-out;
color: var(--color-brand-50);
transform-origin: center;
background-color: var(--color-brand-600);
transition: all 0.3s ease-in-out;
`
const Image = styled.img`
width:100%;
transition: all 0.3s ease-in-out;
filter:grayscale(0.5) ;
&:hover{
    transform: scale(1.2);
    filter:grayscale(0);
}
&:hover ~ p{
    transform: rotate(45deg) scale(1.1);
}
`


const StyledCard = styled.div`
border-radius: var(--border-radius-lg);
overflow: hidden;
position: relative;
cursor: pointer;
`;
function Card({category ,image,onClick}) {    
    const cardRef = useRef();
    useGSAP(()=>{
        if(cardRef){
            gsap.fromTo(cardRef.current,{
                opacity:0,
                scale:0.5,
                y:-100,
            },{
                opacity:1,
                scale:1,
                y:0,
                duration:0.5,
                ease:"power4.inOut"
            })
        }
    })
    return (
        <StyledCard ref={cardRef} onClick={onClick}>
        <Image loading="lazy" src={image} alt={category} />
        <P>{category}</P>
        </StyledCard>
    )
}
Card.propTypes = {
    category: PropTypes.string,
    image:PropTypes.string,
    onClick: PropTypes.func,
}

export default Card
