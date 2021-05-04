import React from "react";
import {useAppContext} from "../../context/appState.context";
import {InputBox} from "../../components";
import {Link} from 'react-router-dom';

interface CategoryProps {
}

const Category: React.FC<CategoryProps> = ({}: CategoryProps) => {
    const [formState, setFormState] = React.useState({name: '', description: ''});
    const {categories, dispatch, currentCategory} = useAppContext();

    function onHandleChange(e: any) {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    async function onCategorySubmit(e: any) {
        e.preventDefault();
        e.stopPropagation();
        try {
            const resp = await (await fetch('/api/categories/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formState)
            })).json();
            if (resp.status === false)
                throw new Error();
            setFormState({name: '', description: ''});
            dispatch({type: 'NEW_CATEGORY_ADDED', payload: resp.category});
        } catch (e) {
            return alert('Something Error Occurred');
        }
    }

    return (
        <React.Fragment>
            <div className="text-xl text-indigo-700">List of All Categories: {categories.length} </div>
            <div className="my-4">
                {categories.map((category: any, index: number) =>
                    <Link to={`/categories/${category.slug}`} key={index}>
                    <div onClick={() => dispatch({type: 'SELECT_CATEGORY', payload: category})} > {category.name} </div>
                </Link>)}
            </div>

            <div className="my-4">
                <div className="text-xl mb-3">Add new category</div>
                <form action="/categories" method={'POST'}
                      onSubmit={onCategorySubmit}
                      className={'flex flex-col space-x-3 items-center justify-center'}>
                    <div>
                        <label htmlFor="categoryName">Category Name:</label>
                        <InputBox name={'name'} type={'text'} classType={'input-box'} placeholder={'Enter category'}
                                  value={formState.name} onchangeFn={onHandleChange}/>
                    </div>
                    <div>
                        <label htmlFor="categoryName">Category Description:</label>
                        <textarea required={true} name={'description'} className={'input-box'}
                                  placeholder={'Add description'}
                                  value={formState.description} onChange={onHandleChange}/>
                    </div>
                    <button type="submit" className={'btn-indigo my-3'}>Add Category &rarr;</button>
                </form>
            </div>

        </React.Fragment>
    );
};

export default Category;
