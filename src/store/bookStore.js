import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: []
};

const bookSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.books = action.payload;
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter(book => book.id !== action.payload);
  },
  }
});

export const bookActions = bookSlice.actions;
export default bookSlice.reducer;
