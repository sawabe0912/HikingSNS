import axios from "axios";
import {
	ADD_EVENT,
	GET_EVENTS,
	EVENT_ERROR,
	GET_EVENT,
	UPDATE_JOINS,
	UPDATE_INTERESTS
} from "./types";

//get Events
export const getEvents = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/events");

		dispatch({
			type: GET_EVENTS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: EVENT_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

//Add Event
export const addEvent = (formData, navigate) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	try {
		const res = await axios.post(`/api/events`, formData, config);

		dispatch({
			type: ADD_EVENT,
			payload: res.data
		});
		navigate("/events", { replace: true });
	} catch (err) {
		dispatch({
			type: EVENT_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

//get event
export const getEvent = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/events/${id}`);

		dispatch({
			type: GET_EVENT,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: EVENT_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

//Add join
export const addJoin = (eventId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/events/join/${eventId}`);

		dispatch({
			type: UPDATE_JOINS,
			payload: { eventId, joins: res.data }
		});
	} catch (err) {
		dispatch({
			type: EVENT_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

//Add interest
export const addInterest = (eventId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/events/interest/${eventId}`);

		dispatch({
			type: UPDATE_INTERESTS,
			payload: { eventId, interests: res.data }
		});
	} catch (err) {
		dispatch({
			type: EVENT_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};
