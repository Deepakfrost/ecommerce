const InitState={
    cart:[]
};

export const cartReducer=(state=InitState,action)=>{
    switch (action.type) {
        case "ADD_CART":
            return{
                ...state,
                cart:[...state.cart,action.payload]
            }
            case "RMV_CART":
                const data=state.cart.filter((ele)=>{
                    return(
                        ele.id!==action.payload
                    )
                })
            return{
                ...state,
                cart:data
            }
            
           
    
        default:
            return state;
    }
}