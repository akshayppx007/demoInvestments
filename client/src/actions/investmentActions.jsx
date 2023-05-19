import axios from "axios";
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
} from "../constants/investmentConstants";

// create investment
export const createInvestment = (formData) => async (dispatch) => {
    try {
        dispatch({ type: INVESTMENT_CREATE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/invest", formData, config);

        dispatch({ type: INVESTMENT_CREATE_SUCCESS, payload: data }); 
    } catch (error) {
        dispatch({
            type: INVESTMENT_CREATE_FAILURE,
            payload: error.response.data.message,
        });

    }
}

// get user investments
export const getUserInvestments = () => async (dispatch) => {
    try {
        dispatch({ type: INVESTMENT_LIST_REQUEST });

        const { data } = await axios.get("/api/v1/investment");

        dispatch({ type: INVESTMENT_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: INVESTMENT_LIST_FAILURE,
            payload: error.response.data.message,
        });
    }
}




// withdraw interest
export const withdrawInterest = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: INTEREST_WITHDRAWAL_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`/api/v1//withdraw/${id}/interest`, formData , config);

        dispatch({ type: INTEREST_WITHDRAWAL_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: INTEREST_WITHDRAWAL_FAILURE,
            payload: error.response.data.message,
        });
    }
}

// get all investments - ADMIN
export const getAllInvestments = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_INVESTMENT_LIST_REQUEST });

        const { data } = await axios.get("/api/v1/admin/investments");

        dispatch({ type: ADMIN_INVESTMENT_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: ADMIN_INVESTMENT_LIST_FAILURE,
            payload: error.response.data.message,
        });
    }
}



// clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
}
