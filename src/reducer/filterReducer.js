const filterReducer = (state, action) => {

    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":

        let priceArr = action.payload.map((curElem) => curElem.price); 
        // console.log(" priceArr", priceArr);

            let maxPrice = Math.max( ...priceArr);
            // console.log('maxPrice', maxPrice);

            return {
                ...state,
                filter_products: action.payload,
                all_products: [...action.payload],
                filters: { ...state.filters, maxPrice, price: maxPrice },
            };

            case "SET_GRID_VIEW":
                return {
                    ...state,
                    grid_view: true,
                };

            case "SET_LIST_VIEW":
                return {
                    ...state,
                    grid_view: false,
                };

                case "GET_SORT_VALUE":
                    // let userSortValue = document.getElementById("sort");
                    // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;

                    // console.log(userSortValue);
                    // console.log('abc',  sort_value, userSortValue.options[0].value, userSortValue.selectedIndex);
                return {
                    ...state,
                    sorting_value: action.payload,
                }

                case "SORTING_PRODUCTS":
                let newSortData;
                // let tempSortProduct = [...action.payload];

                const { filter_products, sorting_value } = state;
                let tempSortProduct = [...filter_products];

                const sortingProducts = (a,b) => {
                    if (sorting_value === "lowest") {
                        return a.price - b.price;
                }
                if (sorting_value === "highest") {
                    return b.price - a.price;
                    };
                    if (sorting_value === "a-z") {
                        return a.name.localeCompare(b.name)
                    }
                    if (sorting_value === "z-a") {
                        return b.name.localeCompare(a.name)
            };
                }

                newSortData = tempSortProduct.sort(sortingProducts);

                    return{
                        ...state,
                        filter_products: newSortData,
                    };

                    case "UPDATE_FILTERS_VALUE":
                        const {name, value} = action.payload
                        // console.log({[name]: value});
                        return{
                            ...state,
                            filters: {
                                ...state.filters,
                                [name]: value,
                            },
                        };

                        case "FILTER_PRODUCTS":
                            let {all_products} = state;
                            let tempFilterProduct = [...all_products];

                            const { text, category, company, color, price } = state.filters;


                            // console.log({category, company, text, })
                            if (text) {
                                tempFilterProduct = tempFilterProduct.filter
                                ((curElem) => {
                                    // console.log(curElem);
                                    // console.log(curElem.name);
                                    // console.log(curElem.name.includes(text), curElem.name, text);
                                    return curElem.name.toLowerCase().includes(text);
                                });
                            }

                            if (category !== "all") {
                                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                                    // console.log(curElem.category, category);
                                    return curElem.category === category;
                                });
                            }

                            if (company !== "all") {
                                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                                    return curElem.company === company;
                                });
                            }

                            if (color !== "all") {
                                tempFilterProduct = tempFilterProduct.filter((curElem) =>
                                curElem.colors.includes(color)
                                );
                            }

                            if (price === 0) {
                                tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.price == price);
                            } else {
                                tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.price < price);
                            }

                            return{
                                ...state,
                                filter_products: tempFilterProduct
                            }

                            case "CLEAR_FILTERS":
                                return {
                                    ...state,
                                    filters: {
                                        ...state.filters,
                                        text: "",
                                        category: "all",
                                        company: "all",
                                        color: "all",
                                        // maxPrice: 0,
                                        // price: state.filters.maxPrice,
                                        // minPrice: state.filters.maxPrice,                              
                                    },
                                }

            default:
                return state;
    }
};

export default filterReducer;