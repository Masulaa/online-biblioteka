import { configureStore } from  '@reduxjs/toolkit'

import menuReducer from "./menuStore"
import bookReducer from "./bookStore"

const store = configureStore({
  reducer:{books: bookReducer,
  menu: menuReducer}
});


export default store;