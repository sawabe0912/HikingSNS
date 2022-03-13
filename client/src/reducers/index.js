import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import event from "./event";

export default combineReducers({
	auth,
	profile,
	post,
	event
});
