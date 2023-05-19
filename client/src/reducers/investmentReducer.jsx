import {
	INVESTMENT_CREATE_REQUEST,
	INVESTMENT_CREATE_SUCCESS,
	INVESTMENT_CREATE_FAILURE,
	INVESTMENT_LIST_REQUEST,
	INVESTMENT_LIST_SUCCESS,
	INVESTMENT_LIST_FAILURE,
	ADMIN_INVESTMENT_LIST_REQUEST,
	ADMIN_INVESTMENT_LIST_SUCCESS,
	ADMIN_INVESTMENT_LIST_FAILURE,
	CLEAR_ERRORS,
	INTEREST_WITHDRAWAL_REQUEST,
	INTEREST_WITHDRAWAL_SUCCESS,
	INTEREST_WITHDRAWAL_FAILURE,
	INTEREST_WITHDRAWAL_RESET,
} from "../constants/investmentConstants";

export const investmentReducer = (state = { investment: {} }, action) => {
	switch (action.type) {
		case INVESTMENT_CREATE_REQUEST:
			return {
				loading: true,
				investment: {},
			};
		case INVESTMENT_CREATE_SUCCESS:
			return {
				loading: false,
				investment: action.payload.investment,
			};
		case INVESTMENT_CREATE_FAILURE:
			return {
				loading: false,
				error: action.payload,
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

export const userInvestmentsReducer = (state = { investments: [] }, action) => {
	switch (action.type) {
		case INVESTMENT_LIST_REQUEST:
			return {
				loading: true,
				investments: [],
			};
		case INVESTMENT_LIST_SUCCESS:
			return {
				loading: false,
				investments: action.payload.investments,
			};
		case INVESTMENT_LIST_FAILURE:
			return {
				loading: false,
				error: action.payload,
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

export const withdrawInterestReducer = (state = {}, action) => {
	switch (action.type) {
		case INTEREST_WITHDRAWAL_REQUEST:
			return {
				loading: true,
			};
		case INTEREST_WITHDRAWAL_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
			};
		case INTEREST_WITHDRAWAL_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case INTEREST_WITHDRAWAL_RESET:
			return {
				...state,
				success: false,
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

export const adminInvestmentsReducer = (
	state = { investments: [] },
	action
) => {
	switch (action.type) {
		case ADMIN_INVESTMENT_LIST_REQUEST:
			return {
				loading: true,
				investments: [],
			};
		case ADMIN_INVESTMENT_LIST_SUCCESS:
			return {
				loading: false,
				investments: action.payload.investments,
			};
		case ADMIN_INVESTMENT_LIST_FAILURE:
			return {
				loading: false,
				error: action.payload,
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
