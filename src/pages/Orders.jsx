import Heading from "../ui/Heading";
import Row from "../ui/Row";
import OrdersTable from "../features/orders/OrdersTable";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import Search from "../ui/Search";
function Orders() {
    const headingRef = useRef();
      const [search,setSearch] = useState('');
    
    useGSAP(()=>{
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
      )
    })
  return(
    <>
    <Row type="horizontal">
      <Heading as="h1" ref={headingRef}>All orders</Heading>
      <Search search={search} setSearch={setSearch} placeholder="Search by customer name or order id or food name"/>
    </Row>
    <Row>
      <OrdersTable search={search}/>
    </Row>
  </>
)
}

export default Orders;
