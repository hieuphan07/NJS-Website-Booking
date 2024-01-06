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
	reducers: {},
});

export default searchSlice.reducer;
