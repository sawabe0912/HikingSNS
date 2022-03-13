import {
	GET_EVENTS,
	EVENT_ERROR,
	ADD_EVENT,
	GET_EVENT,
	UPDATE_JOINS,
	UPDATE_INTERESTS
} from "../actions/types";

const initialState = {
	events: [],
	event: null,
	loading: true,
	error: {}
};

function eventReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_EVENTS:
			return {
				...state,
				events: payload,
				loading: false
			};
		case GET_EVENT:
			return {
				...state,
				event: payload,
				loading: false
			};
		case ADD_EVENT:
			return {
				...state,
				events: [payload, ...state.events],
				loading: false
			};
		case UPDATE_JOINS:
			return {
				...state,
				events: state.events.map((event) =>
					event._id === payload.eventId
						? { ...event, joins: payload.joins }
						: event
				),
				loading: false
			};
		case UPDATE_INTERESTS:
			return {
				...state,
				events: state.events.map((event) =>
					event._id === payload.eventId
						? { ...event, interests: payload.interests }
						: event
				),
				loading: false
			};
		case EVENT_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};

		default:
			return state;
	}
}

export default eventReducer;
