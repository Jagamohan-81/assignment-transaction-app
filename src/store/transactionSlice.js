// transactionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialValue = [
  {
    id: 1,
    transactionDate: "2023-08-01",
    invoiceNumber: "INV123",
    payer: "Alice",
    payee: "Bob",
    amount: 1000,
    status: "First",
  },
  {
    id: 2,
    transactionDate: "2023-08-02",
    invoiceNumber: "INV124",
    payer: "Charlie",
    payee: "David",
    amount: 200,
    status: "Second",
  },
  {
    id: 3,
    transactionDate: "2023-08-05",
    invoiceNumber: "INJ78",
    payer: "USA",
    payee: "AUS",
    amount: 1900,
    status: "Third",
  },
  {
    id: 4,
    transactionDate: "2022-08-02",
    invoiceNumber: "ACD78",
    payer: "IND",
    payee: "USA",
    amount: 20000,
    status: "Second",
  },
  {
    id: 5,
    transactionDate: "2023-09-15",
    invoiceNumber: "INV125",
    payer: "Eve",
    payee: "Frank",
    amount: 500,
    status: "First",
  },
  {
    id: 6,
    transactionDate: "2023-10-20",
    invoiceNumber: "INV126",
    payer: "Grace",
    payee: "Henry",
    amount: 800,
    status: "Third",
  },
  {
    id: 7,
    transactionDate: "2023-11-05",
    invoiceNumber: "INJ79",
    payer: "CAN",
    payee: "MEX",
    amount: 1500,
    status: "Second",
  },
  {
    id: 8,
    transactionDate: "2022-12-10",
    invoiceNumber: "ACD79",
    payer: "GER",
    payee: "FRA",
    amount: 22000,
    status: "Third",
  },
  {
    id: 9,
    transactionDate: "2023-01-15",
    invoiceNumber: "INV127",
    payer: "Helen",
    payee: "Ian",
    amount: 300,
    status: "First",
  },
  {
    id: 10,
    transactionDate: "2023-02-20",
    invoiceNumber: "INV128",
    payer: "Jack",
    payee: "Kate",
    amount: 700,
    status: "Second",
  },
  {
    id: 11,
    transactionDate: "2023-03-05",
    invoiceNumber: "INJ80",
    payer: "BRA",
    payee: "ARG",
    amount: 2100,
    status: "Third",
  },
  {
    id: 12,
    transactionDate: "2023-04-10",
    invoiceNumber: "ACD80",
    payer: "CHN",
    payee: "JPN",
    amount: 18000,
    status: "First",
  },
  {
    id: 13,
    transactionDate: "2023-05-15",
    invoiceNumber: "INV129",
    payer: "Liam",
    payee: "Mia",
    amount: 900,
    status: "Third",
  },
  {
    id: 14,
    transactionDate: "2023-06-20",
    invoiceNumber: "INV130",
    payer: "Noah",
    payee: "Olivia",
    amount: 1200,
    status: "Second",
  },
  {
    id: 15,
    transactionDate: "2023-07-05",
    invoiceNumber: "INJ81",
    payer: "Nigeria",
    payee: "Egypt",
    amount: 2500,
    status: "First",
  },
];

export const fetchUSDRate = createAsyncThunk(
  "transactions/fetchUSDRate",
  async () => {
    return 75.0;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initialValue,
  reducers: {
    addTransaction: (state, action) => {
      const newTransaction = action.payload;
      console.log(newTransaction);
      newTransaction.id = state.length;
      return [...state, newTransaction];
    },
    editTransaction: (state, action) => {
      const { id, data } = action.payload;
      const transactionIndex = state.findIndex(
        (transaction) => transaction.id === id
      );
      if (transactionIndex !== -1) {
        const updatedTransaction = {
          ...state[transactionIndex],
          invoiceNumber: data.invoiceNumber,
          payer: data.payer,
          payee: data.payee,
          amount: data.amount,
          transactionDate: data.transactionDate,
          status: data.status,
        };
        const newState = [...state];

        newState[transactionIndex] = updatedTransaction;

        return newState;
      }
      return state;
    },

    deleteTransaction: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((transaction) => transaction.id !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUSDRate.fulfilled, (state, action) => {
      const usdRate = action.payload;

      state.forEach((transaction) => {
        transaction.usdEquivalent = Number(
          (transaction.amount / usdRate).toFixed(2)
        );
      });
    });
  },
});

export const { addTransaction, deleteTransaction, editTransaction } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
