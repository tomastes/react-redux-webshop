import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: null,
    basketTotal: null,
    orderNummer: null,
    spinner: false,
  },
  reducers: {
    addToBasket: (state, action) => {
      const tempBasket = state.basket ? state.basket : [];
      tempBasket.push(action.payload);
      state.basket = tempBasket;
    },
    setOrderNummer: (state, action) => {
      state.orderNummer = action.payload;
    },
    clearBasket: (state) => {
      state.basket = [];
    },
    removeFromBasket: (state, action) => {
      const filteredBasket = state.basket.filter(
        (item) => item.id != action.payload
      );
      state.basket = filteredBasket;
    },
    changeAmount: (state, action) => {
      state.basket.map((item) => {
        if (item.id == action.payload.id) {
          item.amount = action.payload.amount;
        }
      });
    },
    setBasketFromLocalStorage: (state, action) => {
      state.basket = action.payload;
    },
    qualqBasketTotal: (state, action) => {
      const subTotal = state.basket.reduce((initialVal, item) => {
        return parseFloat(item.price) * item.amount + initialVal;
      }, 0);
      const total = subTotal + 12;
      state.basketTotal = parseFloat(total);
    },
    setSpinner: (state, action) => {
      state.spinner = action.payload;
    },
  },
});

export const {
  setSpinner,
  clearBasket,
  setOrderNummer,
  qualqBasketTotal,
  setBasketFromLocalStorage,
  addToBasket,
  removeFromBasket,
  changeAmount,
} = basketSlice.actions;
// !selectors
export const selectBasket = (state) => state.basket.basket;
export const selectBasketTotal = (state) => state.basket.basketTotal;
export const selectOrderNummer = (state) => state.basket.orderNummer;
export const selectSpinner = (state) => state.basket.spinner;

export default basketSlice.reducer;
