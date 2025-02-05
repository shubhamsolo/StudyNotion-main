import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useLocation, useNavigate , matchPath } from "react-router-dom";
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal';

function Sidebar() {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location=useLocation();
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleLogout = () => {
        setConfirmationModal({
            text1: "Are you sure?",
            text2: "You will be logged out of your account.",
            btn1Text: 'Log Out',
            btn2Text: 'Cancel',
            btn1Handler: () => dispatch(logout(navigate)),
            btn2Handler: () => setConfirmationModal(null)
        });
    };

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname) && !confirmationModal;
    };

    if (authLoading || profileLoading) {
        return (<div className="mt-10">Loading...</div>);
    }

    return (
        <div>
            <div className="flex flex-col min-w-[222px] border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 items-start font-medium text-richblack-300">
                <div className="flex flex-col gap-1 w-full">
                    {sidebarLinks.map((link, index) => {
                        if (link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLink key={link.id} link={link} iconName={link.icon} confirmationModal={confirmationModal}/>
                        );
                    })}
                </div>

                <div className="mx-auto mt-4 mb-4 h-[1px] w-10/12 bg-richblack-600"></div>

                <div className="flex flex-col gap-1 w-full">
                    <button className="relative" onClick={()=>navigate('/dashboard/settings')}>
                        <span className={`absolute py-2 left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute('/dashboard/settings') ? 'opacity-100' : 'opacity-0'}`}></span>
                        <div className={`flex flex-row items-center gap-x-2 px-4 py-2 ${matchRoute('/dashboard/settings') ? 'bg-yellow-800 text-yellow-50' : 'bg-transparent'}`}>
                            <VscSettingsGear/>
                            <span>Settings</span>
                        </div>
                    </button>
                    <button className="relative" onClick={handleLogout} >
                        <span className={`absolute py-2 left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${confirmationModal ? 'opacity-100' : 'opacity-0'}`}></span>
                        <div className={`flex flex-row items-center gap-x-2 px-4 py-2 ${confirmationModal ? 'bg-yellow-800 text-yellow-50' : 'bg-transparent'}`}>
                            <VscSignOut />
                            <span>Log Out</span>
                        </div>
                    </button>
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}

export default Sidebar;
