
export const initialState = {
  product: [],
  cart: []
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        product: [...state.product, action.payload],
      }
    case 'EDIT_PRODUCT':
      const editProduct = action.payload;
      const updatedProduct = state.product.map((eproduct) => {
        if (eproduct.id === editProduct.id) {
          return editProduct;
        }
        return eproduct;
      })
      return {
        ...state,
        product: updatedProduct,
      }
    case 'DELETE_PRODUCT':
      return {
        ...state,
        product: state.product.map((itm) =>
          itm.filter((item)=>item.id !== action.payload)
        )
      };
    case 'ADD_TO_CART':
      return { ...state, }
    default:
      return state;
  }
}