import axios from "axios";
import {
	ADD_POST,
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	GET_POST,
	ADD_COMMENT,
	REMOVE_COMMENT
} from "./types";

//get posts
export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/posts");

		dispatch({
			type: GET_POSTS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

//Add like
export const addLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/like/${postId}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

//Add post
export const addPost = (formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	try {
		const res = await axios.post(`/api/posts`, formData, config);

		dispatch({
			type: ADD_POST,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

//get post
export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${id}`);

		dispatch({
			type: GET_POST,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

//Add comment
export const addComment = (postId, formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	try {
		const res = await axios.post(
			`/api/posts/comment/${postId}`,
			formData,
			config
		);

		dispatch({
			type: ADD_COMMENT,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

//Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};
