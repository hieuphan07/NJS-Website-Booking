import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	city: undefined,
	dates: [],
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
		reset_search: (state, action) => {
			return initialState;
		},
	},
});

export default searchSlice.reducer;

export const { new_search } = searchSlice.actions;
