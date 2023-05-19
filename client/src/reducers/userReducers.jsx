import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_FAILURE,
	CLEAR_ERRORS,
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAILURE,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAILURE,
	UPDATE_PROFILE_RESET,
} from "../constants/userconstants";

export const authReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
		case LOGIN_USER_REQUEST:
		case LOAD_USER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case REGISTER_USER_SUCCESS:
		case LOGIN_USER_SUCCESS:
		case LOAD_USER_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload.user,
				isAuthenticated: true,
			};
		case LOGOUT_USER_SUCCESS:
			return {
				loading: false,
				user: null,
				isAuthenticated: false,
			};
		case LOGOUT_USER_FAILURE:
			return {
				...state,
				error: action.payload,
				user: null,
				isAuthenticated: false,
			};
		case LOAD_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				user: null,
				isAuthenticated: false,
			};
		case REGISTER_USER_FAILURE:
		case LOGIN_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				user: null,
				isAuthenticated: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const userUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PROFILE_REQUEST:
			return {
				loading: true,
			};
		case UPDATE_PROFILE_SUCCESS:
			return {
				loading: false,
				isUpdated: action.payload.success,
			};
		case UPDATE_PROFILE_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case UPDATE_PROFILE_RESET:
			return {
				...state,
				isUpdated: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
