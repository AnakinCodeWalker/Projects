import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    totalItems: localStorage.getItem("localItems") ?
        JSON.parse(localStorage.getItemz("totalItems"))
        : 0
}
const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {

        setTotalItems(state, value) {
            state.token = value.payload
        },
        //  add to cart
        //  removefromcart
        // resetCart
    }
})


export const { setTotalItems } = cartSlice.actions
export default cartSlice.reducer