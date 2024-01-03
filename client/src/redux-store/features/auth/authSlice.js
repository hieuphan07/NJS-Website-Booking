import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.token = '';
			localStorage.removeItem('token');
		},
	},
});

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
