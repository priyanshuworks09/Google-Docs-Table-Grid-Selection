import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";

const expesesSlice = createSlice({
  name: "expense",
  initialState: [],
  reducers: {
    add: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (exp) => ({
        payload: {
          id: nanoid(),
          ...exp,
        },
      }),
    },
    remove: (state, action) => state.filter((e) => e.id !== action.payload),

    update: (state, action) =>
      state.map((e) => (e.id === action.payload.id ? action.payload : e)),
  },
});

export const { add, remove, update } = expesesSlice.actions;
export const store = configureStore({
  reducer: { expenses: expesesSlice.reducer },
});
