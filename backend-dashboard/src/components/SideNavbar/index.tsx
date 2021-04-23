import React from "react";

interface SideNavbarProps {}

const SideNavbar: React.FC<SideNavbarProps> = ({}: SideNavbarProps) => {
  return (
    <aside className="sticky rounded bg-gray-50 border-r- min-h-screen">
      <div className="border-b w-full text-blue-700 cursor-pointer p-2 inline-flex">
        Dashboard
      </div>
      <div className="p-2 flex space-y-1 flex-col items-start justify-start">
        <div className="text-sm flex text-blue-500  hover:text-blue-700 hover:bg-blue-50 w-full rounded flex-row space-x-2 cursor-pointer">
          <div className="m-2 tracking-wide">Category</div>
        </div>
        <div className="text-sm flex text-blue-500  hover:text-blue-700 hover:bg-blue-50 w-full rounded flex-row space-x-2 cursor-pointer">
          <div className="m-2 tracking-wide">Products</div>
        </div>
        <div className="text-sm flex  text-blue-500 hover:text-blue-700 hover:bg-blue-50 w-full rounded flex-row space-x-2 cursor-pointer">
          <div className="m-2 tracking-wide">Orders</div>
        </div>
      </div>
    </aside>
  );
};

export default SideNavbar;
