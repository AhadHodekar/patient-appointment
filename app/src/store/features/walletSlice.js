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
  },
});

export const { updateWalletBalance } = walletSlice.actions;

export const selectWallet = (state) => state.wallet.balance;

export default walletSlice.reducer;
