"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AppContext } from '@/context/NavContext';
import { createContext, useContext} from 'react';



export default function NavBar() {
    const pathname = usePathname();
    const { activeLink, setActiveLink, user, setUser} = useContext(AppContext);
    const [mobNav, setMobNav] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const toggleMobNav = () => {
        mobNav ? setMobNav(false): setMobNav(true);
    }

    const toggleDropDown = () => {
        dropDown ? setDropDown(false): setDropDown(true);
    }

  useEffect(() => {
    
    const handleScroll = () => {

    const docViewTop = window.scrollY;
    const mainCard = document.querySelector('#main');
    const aboutCard = document.querySelector('#about');
    const contactCard = document.querySelector('#contact');
    const docViewBottom = docViewTop + window.innerHeight;
    const mid = (docViewBottom + docViewTop) / 2
    
    if (mainCard && aboutCard && contactCard){
        if (mid < aboutCard.offsetTop) {
            setActiveLink("home");
        } else if (mid > aboutCard.offsetTop && mid < contactCard.offsetTop) {
            setActiveLink("about");
        } else {
            setActiveLink("contact")
        }
    }

    }; 

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
    window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    return (
        <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex justify-between">
                    <Link href="/" className="flex items-center mr-10" onClick={() => handleLinkClick("home")}>
                        <img src="/images/japan.png" className="h-8 mr-3" alt="Flowbite Logo"/>
                        <div className="self-center text-sm sm:text-2xl font-semibold whitespace-nowrap">Learn Japanese</div>
                    </Link>

                    <div className={`items-center justify-between absolute inset-y-3/4 inset-x-0
                    lg:static ${mobNav ? 'block' : 'hidden'} 
                    w-full lg:flex lg:w-auto lg:order-1`}
                     id="navbar-sticky">
                        <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white">
                            <li>
                                <Link href="/#" 
                                onClick={() => handleLinkClick("home")}
                                className={
                                    `block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent
                                    ${activeLink=="home" ? "lg:bg-transparent lg:text-blue-700 lg:p-0":
                                 "lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0"}`
                                } 
                                >Home</Link>
                            </li>
                            <li>
                                <Link href="/#about"
                                onClick={() => handleLinkClick("about")}
                                className={
                                    `block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent
                                    ${activeLink=="about" ? "lg:bg-transparent lg:text-blue-700 lg:p-0":
                                 "lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 "}`
                                } 
                                >About</Link>
                            </li>
                            <li>
                                <Link href="/#contact" 
                                onClick={() => handleLinkClick("contact")}
                                className={
                                    `block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent
                                    ${activeLink=="contact" ? "lg:bg-transparent lg:text-blue-700 lg:p-0":
                                 "lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0"}`
                                } 
                                >Contact</Link>
                            </li>

                            <li>
                                <button onClick={() => toggleDropDown()}
                                className={`flex items-center justify-between w-full py-2 pl-3 pr-4 ${activeLink=="learn" ? "lg:bg-transparent lg:text-blue-700 lg:p-0":
                                "lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0"}`}>
                                    Study 
                                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                                    <div id="dropdownNavbar" className={`z-10 ${dropDown ? "absolute" : "hidden"} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                                        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                                        <li>
                                            <Link href="/learn" className="block px-4 py-2 hover:bg-gray-100">Search</Link>
                                        </li>
                                        <li>
                                            <Link href="/notes" className="block px-4 py-2 hover:bg-gray-100">Notes</Link>
                                        </li>
                                        <li>
                                            <a href="/test" className="block px-4 py-2 hover:bg-gray-100">Test</a>
                                        </li>
                                        </ul>
                                    </div>
                            </li>
                            



                            <li>
                                <Link href="/account" 
                                //onClick={() => handleLinkClick("account")}
                                className={
                                    `block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent
                                    ${activeLink=="account" ? "lg:bg-transparent lg:text-blue-700 lg:p-0":
                                 "lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 "}`
                                } 
                                >Account</Link>
                            </li>


                            <li>
                                <form action={user ? "/auth/signout": "/login"} method={user ? "post": "get"}>
                                    <button type="submit"
                                    //onClick={() => handleLinkClick("account")}
                                    className={
                                        `block lg:hidden  w-full text-left py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent`}
                                    >{user ? "Logout" : "Login"} </button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex lg:order-2">

                <form action={user ? "/auth/signout": "/login"} method={user ? "post": "get"}>
                    <button 
                    href= {user ? "/auth/signout": "/login"} 
                    type="submit" 
                    className="hidden lg:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 lg:mr-0">
                        {user ? "Logout" : "Login"} 
                    </button>
                </form>


                    <button data-collapse-toggle="navbar-sticky" type="button" 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
                    aria-controls="navbar-sticky" aria-expanded="false"
                    onClick={() => toggleMobNav()}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>

            </div>
        </nav>

    )
}
    