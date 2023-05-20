import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Subham Haldar" },
  { id: "1", name: "shinigami" },
  { id: "2", name: "subham07-t" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
