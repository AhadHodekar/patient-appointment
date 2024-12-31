import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateWalletBalance: (state, action) => {
      state.balance = action.payload;
    },
    clearWalletBalance: (state) => {
      state.balance = 0;
    },
  },
});

export const { updateWalletBalance, clearWalletBalance } = walletSlice.actions;

export const selectWallet = (state) => state.wallet.balance;

export default walletSlice.reducer;
