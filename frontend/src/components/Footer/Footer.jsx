import React from 'react'  
import { Outlet, Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="h-[8rem]  w-full gap-[4rem] flex justify-center items-center bg-zinc-900">
 <div className='m-20  h-8 w-[10rem] flex '>
    <img className='  w-full h-full' src="./ledger.jpg" alt="" />
 </div>
 <div className='flex gap-[6rem] flex text-md  items-center text-slate-300	'>
   
    <span>ABOUT</span>
    <span>
   <Link to={"./admin"}>
      MINISTRY
   </Link>
      </span>
    <span>STUDENT</span>
    <span>INSTITUION</span>
    <span>COMPANIES</span>
 </div>

    </div>
  )
}


export default Footer;