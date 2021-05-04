export function reducer(state: any, action: any) {
    switch (action.type) {
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
