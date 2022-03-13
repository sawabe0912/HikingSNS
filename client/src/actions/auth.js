import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_PROFILE
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("/api/auth");

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const body = JSON.stringify({ name, email, password });

		try {
			const res = await axios.post("/api/users", body, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				console.log("error");
			}
			dispatch({
				type: REGISTER_FAIL
			});
		}
	};

//Login User
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post("/api/auth", body, config);
		setAuthToken(res.data.token);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			console.log("error");
		}
		dispatch({
			type: LOGIN_FAIL
		});
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};
