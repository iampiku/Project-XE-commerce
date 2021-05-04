export function reducer(state: any, action: any) {
    switch (action.type) {
        case 'NO_CURRENT_CATEGORY':
            return {...state, currentCategory: null}
        case 'SELECT_CATEGORY':
            return {...state, currentCategory: action.payload}
        case 'NEW_CATEGORY_ADDED':
            const updatedCategoriesList = [...state.categories, action.payload];
            return {...state, categories: updatedCategoriesList}
        case 'FETCH_PRODUCTS':
            return {...state, products: action.payload}
        case 'FETCH_CATEGORIES':
            return {...state, categories: action.payload}
        case 'ERROR':
            return {...state, error: 'Error on fetching data!'}
        default:
            return state;
    }
}
