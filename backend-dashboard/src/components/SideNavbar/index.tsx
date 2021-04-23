import React from "react";

interface SideNavbarProps {}

const SideNavbar: React.FC<SideNavbarProps> = ({}: SideNavbarProps) => {
  return (
    <div className="sticky rounded">
      <div className="text-blue-700 cursor-pointer p-2 inline-flex">
        Dashboard
      </div>
    </div>
  );
};

export default SideNavbar;
