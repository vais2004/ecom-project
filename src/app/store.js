// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "../features/cartReducer";
// import wishlistReducer from "../features/wishlistReducer";
// import searchReducer from '../features/searchSlice'

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     wishlist:wishlistReducer,
//     search:searchReducer,
//   },
// });

// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "../features/cartReducer";
// import wishlistReducer from "../features/wishlistReducer";
// import searchReducer from "../features/searchSlice";

// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist'; // ✅ Fixed typo: 'presist' → 'persist'
// import { combineReducers } from "redux";
// import {thunk} from 'redux-thunk'; // ✅ Fixed typo: 'red' → 'redux-thunk'

// // Combine your reducers
// const rootReducer = combineReducers({
//   cart: cartReducer,
//   wishlist: wishlistReducer,
//   search: searchReducer,
// });

// // Configure persist
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Create the store with persisted reducer
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk],
// });

// // Create the persistor
// export const persistor = persistStore(store);
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartReducer";
import wishlistReducer from "../features/wishlistReducer";
import searchReducer from "../features/searchSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import userReducer from "../features/userReducer";
import authenticationReducer from "../features/authenticationSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  search: searchReducer,
  user: userReducer,
  auth: authenticationReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required to prevent errors with redux-persist
    }),
});

export const persistor = persistStore(store);
