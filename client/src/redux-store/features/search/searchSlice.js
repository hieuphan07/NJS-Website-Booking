import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	city: '',
	dates: [
		{
			startDate: new Date().getTime(),
			endDate: new Date().getTime() + 1000 * 3600 * 24,
		},
	],
	options: {
		adult: 1,
		children: 0,
		room: 1,
	},
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
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
		setAdultByAmount: (state, action) => {
			if (action.payload < 1) {
				state.options.adult = 1;
			} else {
				state.options.adult = action.payload;
			}
		},
		childrenIncrement: (state) => {
			state.options.children++;
		},
		childrenDecrement: (state) => {
			if (state.options.children === 0) return;
			state.options.children--;
		},
		setChildrenByAmount: (state, action) => {
			if (action.payload < 0) {
				state.options.children = 0;
			} else {
				state.options.children = action.payload;
			}
		},
		roomIncrement: (state) => {
			state.options.room++;
		},
		roomDecrement: (state) => {
			if (state.options.room === 1) return;
			state.options.room--;
		},
		setRoomByAmount: (state, action) => {
			if (action.payload < 1) {
				state.options.room = 1;
			} else {
				state.options.room = action.payload;
			}
		},
		reset_search: (state) => {
			return initialState;
		},
	},
});

export default searchSlice.reducer;

export const {
	setDestination,
	setDates,
	adultIncrement,
	adultDecrement,
	setAdultByAmount,
	childrenIncrement,
	childrenDecrement,
	setChildrenByAmount,
	roomIncrement,
	roomDecrement,
	setRoomByAmount,
	reset_search,
} = searchSlice.actions;

export const selectCity = (state) => state.search.city;

export const selectDates = (state) => state.search.dates;

export const selectOptions = (state) => state.search.options;
