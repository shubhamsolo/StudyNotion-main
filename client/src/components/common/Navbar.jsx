import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from '../../data/navbar-links';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from "../../services/operations/courseAPI";
import { logout } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const [subLinks, setSubLinks] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getAllCategories();
                setSubLinks(categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Handle error as needed
            }
        };

        fetchCategories();
    }, []);

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    const handleLogout = () => {
        dispatch(logout(navigate)); // Dispatch logout action
    };

    return (
        <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
            <div className="flex w-10/12 max-w-maxContent items-center justify-between">
                <Link to='/'>
                    <div className="flex flex-row items-center gap-2 text-white text-xl font-semibold">
                        <p className="w-[32px] h-[32px] rounded-2xl bg-white text-richblack-800 text-2xl font-bold text-center">S</p>
                        <p>StudyNotion</p>
                    </div>
                </Link>

                <nav>
                    <ul className="flex gap-x-6">
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === 'Catalog' ?
                                            (
                                                <div className="group relative flex items-center gap-2">
                                                    <div className="flex items-center gap-1 cursor-pointer text-richblack-25">
                                                        <p>{link.title}</p>
                                                        <FaAngleDown />
                                                    </div>

                                                    <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[60%] top-[-100%] 
                                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transtion-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[200px] group-hover:z-50">

                                                        <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5">
                                                        </div>

                                                        {
                                                            subLinks?.length > 0 ? (
                                                                subLinks.map((subLink, index) => (
                                                                    <Link key={index} to={`/catalog/${subLink.name}`}>
                                                                        {subLink.name}
                                                                    </Link>
                                                                ))
                                                            ) : (<div></div>)
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className="flex gap-x-4 items-center">
                    {
                        user && user?.accountType !== 'Instructor' && (
                            <Link to='/dashboard/cart' className="relative">
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to='/login'>
                                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[3px] text-richblack-25 rounded-md">Log In</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to='/signup'>
                                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[3px] text-richblack-25 rounded-md">Sign Up</button>
                            </Link>
                        )
                    }
                    {
                        token != null && (
                            <div className="flex flex-row items-center gap-8">
                                <BsCart className="text-richblack-300 text-2xl" />
                                <div className="group relative gap-2">
                                    <div className="flex -flex-row items-center text-white gap-1">
                                        <img src={user.image} alt='tempImage' className="w-[34px] h-[34px] rounded-full cursor-pointer" />
                                        <FaAngleDown />
                                    </div>

                                    <div className="invisible absolute left-[50%] translate-x-[-69%] translate-y-[100%] top-[-100%] 
                                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transtion-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[160px] group-hover:z-50">

                                        <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5">
                                        </div>

                                        <Link className="text-[18px] cursor-pointer" to='/dashboard/my-profile'>Dashboard</Link>
                                        <button onClick={handleLogout} className="text-[18px] cursor-pointer">Sign Out</button>
                                    </div>
                                </div>
                            </div>

                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;
