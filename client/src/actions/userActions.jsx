import axios from "axios";
import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	CLEAR_ERRORS,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_FAILURE,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAILURE,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAILURE,
} from "../constants/userconstants";

// register user
export const registerUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		};

		const { data } = await axios.post("/api/v1/register", userData, config);

		dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: REGISTER_USER_FAILURE,
			payload: error.response.data.message,
		});
	}
};

// logout user
export const logoutUser = () => async (dispatch) => {
	try {

		const config = {
			withCredentials: true,
		};

		const { data } = await axios.get("/api/v1/logout", config);

		dispatch({ type: LOGOUT_USER_SUCCESS, payload: data.message });
	} catch (error) {
		dispatch({
			type: LOGOUT_USER_FAILURE,
			payload: error.response.data.message,
		});
	}
};

// login user
export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: LOGIN_USER_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		};
		const { data } = await axios.post(
			"/api/v1/login",
			{
				email,
				password,
			},
			config
		);

		dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: LOGIN_USER_FAILURE,
			payload: error.response.data.message,
		});
	}
};

// get user profile
export const getUserProfile = () => async (dispatch) => {
	try {
		dispatch({
			type: LOAD_USER_REQUEST,
		});

		const { data } = await axios.get("/api/v1/profile");

		dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({
			type: LOAD_USER_FAILURE,
			payload: error.response.data.message,
		});
	}
};

// update user Profile
export const updateUserProfile = (formData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROFILE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put("/api/v1/profile", formData, config);

		dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: UPDATE_PROFILE_FAILURE,
			payload: error.response.data.message,
		});
	}
};

// clear errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
