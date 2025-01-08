import { useContext } from "react";
import { createContext } from "react";
import { useProductContext } from "./productcontext";
import { useReducer } from "react";
import { useEffect } from "react";
import reducer from '../reducer/filterReducer';


const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: "lowest",
    filters: {
        text: "",
        category: "all",
        company: "all",
        color: "all",
        maxPrice: 0,
        price: 0,
        minPrice: 0,
    },
};

export const FilterContextProvider = ({ children }) => {
    const { products } = useProductContext();
    // console.log('products', products);

    const [state, dispatch] = useReducer(reducer, initialState);

    // to set grid view
    const setGridView = () => {
        return dispatch({type: "SET_GRID_VIEW"})
    }

    // to set list view
    const setListView = () => {
        return dispatch({type: "SET_LIST_VIEW"})
    }

    // sorting function
    const sorting = (event) => {
        let userValue = event.target.value;
        dispatch({ type: "GET_SORT_VALUE", payload: userValue });
        console.log({userValue});
    };

    // update the filter values
    const updateFilterValue = (event) => {
        let name = event.target.name; // event.target.name ko as a key maan skte h ki jo hm input feild me likhege, or isme name milega jo hm filterSection se bhej rhe h.
        let value = event.target.value; // isme jo hm likhege input feild me wo milega as a value.
        // console.log({name, value})

        
        return dispatch({type: "UPDATE_FILTERS_VALUE", payload: {name, value}})
    }

    // to clear the filters
    const clearFilters = () => {
        dispatch({type: "CLEAR_FILTERS"})
    };

    // to sort the product
    useEffect(() => {
        dispatch({type: "FILTER_PRODUCTS"});
        dispatch({type: "SORTING_PRODUCTS"})
        }, [products, state.sorting_value, state.filters]);

        // to load all the products for grid and list view
    useEffect(() => {
        // console.log('useEffect', products);
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
    }, [products]);

    return (
        <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting, updateFilterValue, clearFilters, }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};


/* useEffect ka dependencies array kaise work krta h 
1. useEffect me dependencies array me products pass kr rhe h.
2. To phle dekhege products kha se mil rha h, products hmko  useProductContext se mil rha h.
3. Phr dekhege useProductContext kha se call ho rha h, useProductContext productcontext se call ho rha h.
4. productcontext me jayege to phle code ka flow dekhege ki phle konsa code run ho rha h.
5. code first line shuru hota h, phr return ka code chlta h, phr useEffect ka.
6. To shuru me initialState jisme hm products me empty array h. yani phle initialState ka code chalege.
7. Phr mera do function h getProducts or ek getSingleProduct h to ye dono call ne ho rha h ye dono function nhi chalega.
8. Phr return ka code chalega.
9. Phr useEffect ka to useEffect me getProducts function call ho rha h to getProducts wale function se api call ho rha h tb data milega.
10. yani ek baar jb useEffect chala to usme data nhi mila sirf empty array mila kyuki us waqt tk api call hua hi nhi tha jb dobara useEffect chala to usme data mila array of object ke form me kyuki tb getProducts wla function hua or getProducts wale function se hi api call ho rha h.
*/