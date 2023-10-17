'use client';

import { RootState } from "@/app/redux/store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

type InitialState = {
    joke: string,
    status: string,
    error: string | undefined
}

const initialState: InitialState = {
    joke: "",
    status: 'idle', // idle | loading | succeeded | failed
    error: undefined
}

const JOKE_URL = "https://api.chucknorris.io/jokes/random"

export const fetchJoke = createAsyncThunk("joke/fetchJoke", async () => {
    const response = await axios.get(JOKE_URL)
    return response.data
})

export const jokeSlice = createSlice({
    name: "joke",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJoke.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchJoke.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.joke = action.payload
            })
            .addCase(fetchJoke.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export const selectJoke = (state: RootState) => state.joke.joke
export const getJokeStatus = (state: RootState) => state.joke.status
export const getJokeError = (state: RootState) => state.joke.error

export default jokeSlice.reducer;