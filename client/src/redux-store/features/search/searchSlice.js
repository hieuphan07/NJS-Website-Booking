import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	city: '',
	dates: [
		{
			startDate: new Date().getTime(),
			endDate: new Date().getTime(),
		},
	],
	options: {
		adult: 2,
		children: 0,
		room: 1,
	},
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		new_search: (state, action) => {
			return action.payload;
		},
		reset_search: (state) => {
			return initialState;
		},
		setDestination: (state, action) => {
			state.city = action.payload;
		},
		setDates: (state, action) => {
			state.dates = action.payload;
		},
		adultIncrement: (state) => {
			state.options.adult++;
		},
		adultDecrement: (state) => {
			if (state.options.adult === 1) return;
			state.options.adult--;
		},
		childrenIncrement: (state) => {
			state.options.children++;
		},
		childrenDecrement: (state) => {
			if (state.options.children === 0) return;
			state.options.children--;
		},
		roomIncrement: (state) => {
			state.options.room++;
		},
		roomDecrement: (state) => {
			if (state.options.room === 1) return;
			state.options.room--;
		},
	},
});

export default searchSlice.reducer;

export const {
	new_search,
	reset_search,
	setDestination,
	setDates,
	adultIncrement,
	adultDecrement,
	childrenIncrement,
	childrenDecrement,
	roomIncrement,
	roomDecrement,
} = searchSlice.actions;

export const selectCity = (state) => state.search.city;

export const selectDates = (state) => state.search.dates;

export const selectOptions = (state) => state.search.options;
