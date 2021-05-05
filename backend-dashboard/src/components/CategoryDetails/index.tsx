import React from 'react';
import {useAppContext} from "../../context/appState.context";

interface CategoryDetailsProps {

}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({}: CategoryDetailsProps) => {
    const {currentCategory, dispatch} = useAppContext();

    React.useEffect(() => {
        // clean up function deallocates currentCategory
        // preventing memory leak
        return () => dispatch({type: 'NO_CURRENT_CATEGORY'})
    }, [])

    if (currentCategory === null) return <div className={'m-auto text-red-600'}> No category selected! </div>

    return <React.Fragment>
        <div className="text-xl text-indigo-600">welcome category details page</div>
        <div className="my-3">
            <div className="flex flex-col space-y-3 items-start justify-center">
                <div>Name: {currentCategory.name}</div>
                <div>Desciption: {currentCategory.description}</div>

            </div>
        </div>
    </React.Fragment>
}

export default CategoryDetails;
