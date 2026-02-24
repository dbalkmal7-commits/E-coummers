'use client'


import { CartContext } from '@/context/CartContext';
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

export default function Navbar() {

  const { count, setCount } = useContext(CartContext);
  useEffect(() => {

    function flag(){
    setCount(0);

    }
    flag();

  }, []);

  const { data: session, status } = useSession();
  console.log(status);
  // console.log(session);
  // console.log(status);
  const [open, setOpen] = useState(false)
const closeMenu = () => setOpen(false)
function logout(){
signOut({
  callbackUrl: "/login"
})
}
  return (
    <nav className="bg-blue-400 text-black fixed w-full z-50 start-0 top-0 end-0 mb-8">
      <div className="container mx-auto px-4 py-4  flex items-right justify-between md:w-[80%]">

        {/* Logo */}
        <Link href="/"  onClick={closeMenu} className="font-bold text-2xl flex items-center gap-2 ">
          <i className="fa-solid text-lime-500 fa-cart-arrow-down"></i>
          freshCart
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Menu */}
    {/* Overlay */}
{open && (
  <div
    onClick={() => setOpen(false)}
    className="fixed inset-0 bg-black/50 z-40 md:hidden"
  ></div>
)}

{/* Side Menu */}
<div
  className={`
    fixed top-0 left-0 h-full w-64 bg-blue-400 text-black
    transform transition-transform duration-300 z-50
    ${open ? 'translate-x-0' : '-translate-x-full'}
    md:static md:h-auto md:w-auto md:translate-x-0 md:flex md:justify-between md:items-center md:gap-4 mt-4 
  `}
>
          <div className="left ">
            <ul className="flex flex-col justify-center md:flex-row items-right md:justify-left gap-4 items-center   p-4 md:p-0 ">
            <li><Link href="/"   onClick={closeMenu}>Home</Link></li>
            {session && <li className='relative '><Link href="/cart"  onClick={closeMenu}>Cart {count > 0 && <span className='absolute  top-[-10] end-[-5] flex justify-center items-center bg-white size-4 rounded-lg text-yellow-500'>{count}</span>}</Link></li>}
            <li><Link href="/product"  onClick={closeMenu}>Products</Link></li>
            <li><Link href="/categories"  onClick={closeMenu}>Categories</Link></li>
            <li><Link href="/brands"  onClick={closeMenu}>Brands</Link></li>
            </ul>
          </div>

            {/* Social */}
            <div className="right flex flex-col items-center gap-6 p-4 md:p-0">
              <ul className="flex flex-col justify-center md:flex-row   gap-1 items-center">
              {!session ? <>
                            <li className="">
          
              <Link href="https://www.facebook.com/share/1QDZevKFCB/" target="_blank">
                <i className="fa-brands fa-facebook text-blue-500"></i>
              </Link>
              </li>
              <li>
              <Link href="#" target="_blank">
                <i className="fa-brands fa-instagram text-pink-500"></i>
              </Link>
              </li>
              <li>
              <Link href="#" target="_blank">
                <i className="fa-brands fa-tiktok"></i>
              </Link>
              </li>
              <li>
              <Link href="#" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </Link>
            </li>
                  {/* Auth */}
            <li><Link href="/login"  onClick={closeMenu}>Login</Link></li>
            <li><Link href="/register"  onClick={closeMenu}>Register</Link></li>
              </>:

              <>            <li className='cursor-pointer bg-red-600 border-2 border-black rounded m-3' onClick={logout} >  signOut 
              <i className="fa-solid fa-person-through-window fa-shake color: rgba(177, 151, 252, 1)"></i></li>
            <li>Hello {session?.user?.name}</li></>}

              </ul>
                          <ul>
      
          </ul>
            </div>


        </div>
      </div>
    </nav>
  )
}
