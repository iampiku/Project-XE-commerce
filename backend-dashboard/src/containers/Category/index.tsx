import React from "react";
import {useAppContext} from "../../context/appState.context";
import {InputBox} from "../../components";

interface CategoryProps {
}

const Category: React.FC<CategoryProps> = ({}: CategoryProps) => {
    const [formState, setFormState] = React.useState({name: '', description: '', productIds: []});
    const {categories, products} = useAppContext();

    function onHandleChange(e: any) {
        console.log(e);
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    return (
        <React.Fragment>
            <div className="text-xl text-indigo-700">List of All Categories: {categories.length} </div>
            <div className="my-4">
                {categories.map((category: any, index: number) => <div key={index}> {category.name} </div>)}
            </div>

            <div className="my-4">
                <div className="text-xl mb-3">Add new category</div>
                <form action="/categories" method={'POST'}
                      className={'flex flex-col space-x-3 items-center justify-center'}>
                    <div>
                        <label htmlFor="categoryName">Category Name:</label>
                        <InputBox name={'name'} type={'text'} classType={'input-box'} placeholder={'Enter category'}
                                  value={formState.name} onchangeFn={onHandleChange}/>
                    </div>
                    <div>
                        <label htmlFor="categoryName">Category Description:</label>
                        <textarea name={'description'} className={'input-box'} placeholder={'Add description'}
                                  value={formState.name} onChange={onHandleChange}/>
                    </div>
                    <div>
                        <label htmlFor="products" className={'-ml-3'}>Products Collection(s):</label>
                        <div className={'-ml-3'}>
                            <select multiple={false} placeholder={'Select products'} value={formState.productIds}
                                    onChange={onHandleChange} name="productIds" id="products" className={'input-box'}>
                                {products.map((product: any) => <option value={product.id}
                                                                        key={product.id}> {product.name} </option>)}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className={'btn-indigo my-3'}>Add Category &rarr;</button>
                </form>
            </div>

        </React.Fragment>
    );
};

export default Category;
