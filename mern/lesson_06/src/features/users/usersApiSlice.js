import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initializeState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice