import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext';
import menus from "../assets/menus.png";

const Navbar = () => {

   const {view, setView} = useContext(AppContext);

   const toggle = () => {
    view ? setView(false) : setView(true);
  };

  return (
    <div className='p-5 w-full bg-gray-100 lg:hidden'>
      <img
         onClick={()=>{toggle()}}
        className='w-10'
        src={menus}
        alt=""
      />
    </div>
  )
}

export default Navbar