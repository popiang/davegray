import { createSlice } from "@reduxjs/toolkit";

const initalState = [
    {
        id: "0",
        name: "Dude Lebowski",
    },
    {
        id: "1",
        name: "Neil Young",
    },
    {
        id: "2",
        name: "Dave Gray",
    },
];

const usersSlice = createSlice({
    name: "users",
    initalState,
    reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;