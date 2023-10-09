
export const initialState = {
  product: [],
  price: [],
  url: []
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, product: [...state.product, action.item] }
    case 'DELETE_PRODUCT':
      return { ...state, }
    case 'ADD_TO_CART':
      return {...state,}
        default:
      return state;
  }
}
console.log(initialState);