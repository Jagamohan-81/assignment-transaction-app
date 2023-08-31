// store.js
// import { configureStore } from "@reduxjs/toolkit";
// import transactionsReducer from "./transactionSlice";

// const store = configureStore({
//   reducer: {
//     transactions: transactionsReducer,
//   },
// });

// export default store;
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import thunk from "redux-thunk";
import transactionsReducer from "./transactionSlice";

const persistConfig = {
  key: "root", // Key to uniquely identify the persisted state
  storage, // Storage engine (localStorage by default)
};
const rootReducer = combineReducers({
  transactions: transactionsReducer,
});
const persistedTransactionsReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedTransactionsReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
