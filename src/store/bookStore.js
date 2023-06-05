import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kategorije: ["lektire", "udžbenici", "roman", "drama", "zbirke pjesama"],
  žanrovi: [
    "autobiografija",
    "enciklopedija",
    "tragedija",
    "komedija",
    "drama",
    "horor",
    "ljubavni roman"
  ],
  autori: ["Autor 1", "Autor 2", "Autor 3"],
  izdavači: ["Laguna", "Cid", "Arto", "Nova knjiga"],
  godinaIzdavanja: (() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 30; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  })(),
  pismo: ["latinica", "ćirilica"],
  povez: ["tvrdi", "meki", "kožni", "poluplatneni"],
  format: ["A4", "A5", "A6"]
};

const bookSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter(book => book.id !== action.payload);
  },
  }
});

export const bookActions = bookSlice.actions;
export default bookSlice.reducer;
