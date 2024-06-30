// src/store/bookingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList:[],
};

const productSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    addProduct: (state, action) => {
      const { category, model, serialNum, dateOfInvoice, productImage } = action.payload;
      const newProduct = {
        category, 
        model, 
        serialNum, 
        dateOfInvoice,
        productImage,
      };      
      
      state.productList.push(newProduct);
    },
  },
});

export const { addProduct } = productSlice.actions;
export const formInpValue = (state)=>state.products.value;
export default productSlice.reducer;
