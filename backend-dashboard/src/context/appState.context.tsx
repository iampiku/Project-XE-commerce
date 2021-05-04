import React from 'react';
import {reducer} from "../reducer/appState.reducer";
import {AppStateContext, appStateInitial} from "../utils";

export const useAppContext = () => React.useContext(AppStateContext);

interface AppStateContextProps {
    children: any
}

export function AppStateContextProvider({children}: AppStateContextProps) {
    const [state, dispatch] = React.useReducer(reducer, appStateInitial);

    const fetchAllCategories = async () => {
        const resp = await (await fetch('/api/categories')).json();
        if (resp.status === false)
            return dispatch({type: 'ERROR'})
        dispatch({type: 'FETCH_CATEGORIES', payload: resp.allCategories});
    };

    const fetchAllProducts = async () => {
        const resp = await (await fetch('/api/products')).json();
        if (resp.status === false)
            return dispatch({type: 'ERROR'});
        dispatch({type: 'FETCH_PRODUCTS', payload: resp.allProducts});
    }

    React.useEffect(() => {
        Promise.all([fetchAllCategories(), fetchAllProducts()])
            .then((status) => console.log(`state re-initialized!`))
    }, [])

    return (
        <AppStateContext.Provider value={{...state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
}
