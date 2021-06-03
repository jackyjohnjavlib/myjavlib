import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: null,
    filteredMovies: null,
    details: null,
  },
  reducers: {
    addMovie: (state, action) => {
      state.movies = action.payload;
      state.filteredMovies = action.payload;
    },
    updateFilter: (state, action) => {
      state.filteredMovies = action.payload;
    },
    clearFilters: (state) => {
      state.filteredMovies = state.movies;
    },
    navDetail: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { addMovie, updateFilter, clearFilters, navDetail } =
  movieSlice.actions;

export const selectMovie = (state) => state.movie.movies;

export const selectDetail = (state) => state.movie.details;

export const selectFilter = (state) => state.movie.filteredMovies;

export default movieSlice.reducer;
