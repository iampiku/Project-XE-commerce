import React from "react";
import {Link} from 'react-router-dom';
import {CategoryIcon, HomeIcon} from "../../assets/icons";

interface SideNavbarProps {
}

const SideNavbar: React.FC<SideNavbarProps> = ({}: SideNavbarProps) => {
    return (
        <aside className="sticky rounded border-r min-h-screen">
            <Link to={'/'} className="border-b w-full text-blue-700 cursor-pointer p-2 inline-flex space-x-2">
                <div className="div"> <HomeIcon size={20} color={'blue'} /> </div>
                <div className="div">Dashboard</div>
            </Link>
            <div className="p-2 flex space-y-1 flex-col items-start justify-start">
                <Link to={'/categories'}
                      className={"nav-link"}>
                    <div className="m-3 tracking-wide">Category</div>
                </Link>
                <div
                    className="text-sm flex text-blue-500  hover:text-blue-700 hover:bg-blue-50 w-full rounded flex-row space-x-2 cursor-pointer">
                    <div className="m-2 tracking-wide">Products</div>
                </div>
                <div
                    className="text-sm flex  text-blue-500 hover:text-blue-700 hover:bg-blue-50 w-full rounded flex-row space-x-2 cursor-pointer">
                    <div className="m-2 tracking-wide">Orders</div>
                </div>
            </div>
        </aside>
    );
};

export default SideNavbar;
