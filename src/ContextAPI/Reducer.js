
export const initialState = {
  product: [],
  cart: []
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        product: [...state.product, action.payload]
      }
    case 'EDIT_PRODUCT':
      const updatedProduct = action.payload
      const editProducts = state.product.map((itm) => {
        if (itm.id === updatedProduct.id) {
          return updatedProduct
        }
        return itm
      })
      return {
        ...state,
        product: editProducts
      }
    case 'DELETE_PRODUCT':
      return {
        ...state,
        product: state.product.filter((item) => item.id !== action.payload)
      }
    case 'ADD_TO_CART':
      const valueAdded = action.payload
      console.log(valueAdded)
      if (state.cart.find(itm => itm.id === valueAdded.id)) {
        return state
      }
      return {
        ...state,
        cart: [...state.cart, valueAdded]
      }
    case 'DELETE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload)
      }
    default:
      return state;
  }
}