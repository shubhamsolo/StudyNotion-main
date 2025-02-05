import React from "react";
import * as Icons from 'react-icons/vsc';
import { NavLink, matchPath, useLocation } from "react-router-dom";

function SidebarLink({ link, iconName , confirmationModal}) {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname) && !confirmationModal;
    };

    return (
        <div>
            <NavLink
                to={link.path}
                className={`relative `}
            >
                <span className={`absolute py-2 left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? 'opacity-100' : 'opacity-0'}`}></span>
                <div className={`flex flex-row items-center gap-x-2 px-4 py-2 ${matchRoute(link.path) ? 'bg-yellow-800 text-yellow-50' : 'bg-transparent'}`}>
                    {Icon && <Icon className='text-lg' />}
                    <span>{link.name}</span>
                </div>
            </NavLink>
        </div>
    );
}

export default SidebarLink;
