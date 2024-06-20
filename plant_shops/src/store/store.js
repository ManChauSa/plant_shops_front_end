import { configureStore } from "@reduxjs/toolkit"

const user = localStorage.getItem("myuser") === null ? null : JSON.parse(localStorage.getItem("myuser"));
const token = localStorage.getItem("token") === null ? "" : localStorage.getItem("token");
const intitalCarts = !localStorage.getItem("cart") ? [] : JSON.parse(localStorage.getItem("cart"));
const intitalCar = {
    name: "",
    basePrice: "",
    description: "",
    year: 0,
    model: "",
    make: "",
    stockQuantity: 0,
    attributeTypes: [],
    images: []
}
const initialData = { token: token, user: user, carts: intitalCarts ?? [], car: intitalCar, order: {card: "", address: {}} , search: ""};

const reducer = (state = initialData, action) => {
    if (action.type === "login") {
        localStorage.setItem("token", action.user.token);
        localStorage.setItem("myuser", JSON.stringify(action.user));
        return { ...state, user: action.user, token: action.user.token };
    }

    if (action.type === "cart") {
        let temp = [...state.carts];
        temp.push(action.item);
        localStorage.setItem("cart",JSON.stringify(temp));
        return { ...state, carts: temp };
    }

    if (action.type === "createOrder") {
        return { ...state, order: action.order };
    }

    if (action.type === "clearOrder") {
        return { ...state,carts: [], order: {} };
    }

    if (action.type === "deleteCartItem") {
        let temp = state.carts.filter(e => e !== action.item);
        if (temp.length === 0) {
            return { ...state, carts: [], order: {} };
        }
        localStorage.setItem("cart",JSON.stringify(temp));
        return { ...state, carts: temp };
    }
    if (action.type === "updateCart") {
        let index = state.carts.findIndex(e => e === action.item);
        let temp = [...state.carts];
        temp[index] = action.newItem;
        localStorage.setItem("cart",JSON.stringify(temp));
        return { ...state, carts: temp };
    }

    if (action.type === "logout") {
        localStorage.setItem("token", null);
        localStorage.setItem("myuser", null);
        localStorage.setItem("cart",[]);
        return { ...state, user: null, token: "", carts: [] }
    }
    if (action.type === "manageCar") {
        return {...state, car: action.car}
    }
    if (action.type === "clearProduct") {
        return {...state, car: {}}
    }

    if (action.type === "search") {
        return {...state, search: action.search};
    }

    return state;
}

const store = configureStore({ reducer: reducer });

export default store;