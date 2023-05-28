import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  amount: 0,
  baseCurr: '',
  convertCurr:''
};

export const convertSlice = createSlice({
  name: 'convert',
  initialState,
  reducers: {
    updateAmount: (state, action) => {
        state.amount = action.payload;
    },
    updateBaseCurr: (state, action) => {
        state.baseCurr = action.payload;
    },
    updateConvertCurr: (state, action) => {
        state.convertCurr = action.payload;
    },
  },

});

export const {  updateAmount, updateBaseCurr, updateConvertCurr } = convertSlice.actions;

export const selectAmount = (state) => state.convert.amount;
export const selectBaseCurr = (state) => state.convert.baseCurr;
export const selectConvertCurr = (state) => state.convert.convertCurr;

export default convertSlice.reducer;
