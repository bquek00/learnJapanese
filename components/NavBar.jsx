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
    

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const toggleMobNav = () => {
        mobNav ? setMobNav(false): setMobNav(true);
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
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex justify-between">
                    <Link href="/" className="flex items-center mr-10" onClick={() => handleLinkClick("home")}>
                        <img src="/images/japan.png" className="h-8 mr-3" alt="Flowbite Logo"/>
                        <div className="self-center text-sm sm:text-2xl font-semibold whitespace-nowrap dark:text-white">Learn Japanese</div>
                    </Link>

                    <div className={`items-center justify-between absolute inset-y-3/4 inset-x-0
                    md:static ${mobNav ? 'block' : 'hidden'} 
                    w-full md:flex md:w-auto md:order-1`}
                     id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link href="/#" 
                                onClick={() => handleLinkClick("home")}
                                className={
                                    `block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent
                                    ${activeLink=="home" ? "md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500":
                                 "md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}`
                                } 
                                >Home</Link>
                            </li>
                            <li>
                                <Link href="/#about"
                                onClick={() => handleLinkClick("about")}
                                className={
                                    `block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent
                                    ${activeLink=="about" ? "md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500":
                                 "md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}`
                                } 
                                >About</Link>
                            </li>
                            <li>
                                <Link href="/#contact" 
                                onClick={() => handleLinkClick("contact")}
                                className={
                                    `block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent
                                    ${activeLink=="contact" ? "md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500":
                                 "md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}`
                                } 
                                >Contact</Link>
                            </li>

                            <li>
                                <Link href="/learn" 
                                //onClick={() => handleLinkClick("account")}
                                className={
                                    `block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent
                                    ${activeLink=="learn" ? "md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500":
                                 "md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}`
                                } 
                                >Learn</Link>
                            </li>

                            <li>
                                <Link href="/account" 
                                //onClick={() => handleLinkClick("account")}
                                className={
                                    `block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent
                                    ${activeLink=="account" ? "md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500":
                                 "md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}`
                                } 
                                >Account</Link>
                            </li>


                            <li>
                                <Link href="/login" 
                                //onClick={() => handleLinkClick("account")}
                                className={
                                    `block md:hidden  py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent`}
                                >Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex md:order-2">

                <form action={user ? "/auth/signout": "/login"} method={user ? "post": "/get"}>
                    <button 
                    href= {user ? "/auth/signout": "/login"} 
                    type="submit" 
                    className="hidden sm:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {user ? "Logout" : "Login"} 
                    </button>
                </form>


                    <button data-collapse-toggle="navbar-sticky" type="button" 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
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
    