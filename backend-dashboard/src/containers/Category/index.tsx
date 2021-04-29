import React from "react";

interface CategoryProps {
}

const Category: React.FC<CategoryProps> = ({}: CategoryProps) => {
    return (
        <React.Fragment>
            <div className="text-sm text-indigo-700">Category Content Area</div>
        </React.Fragment>
    );
};

export default Category;
