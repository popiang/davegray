import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "0", name: "Shahril bin Mad Shah" },
    { id: "1", name: "Umi Syafira binti Azmi" },
    { id: "2", name: "Nur Shah Adriana binti Shahril" },
];

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
});

export const selectAllUsers = (state) => state.users;

export const selectUserById = userId => state =>
    state.users.find((user) => user.id === userId);

export default usersSlice.reducer;
