import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ProfileForm from "./components/profile-forms/ProfileForm";
import AddExperience from "./components/profile-forms/AddExperience";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import EventMenu from "./components/events/EventMenu";
import EventForm from "./components/event/EventForm";
import Events from "./components/events/Events";

import NotFound from "./components/layout/NotFound";
import PrivateRoute from "./components/routing/PrivateRoute";
import { LOGOUT } from "./actions/types";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		store.dispatch(loadUser());

		window.addEventListener("storage", () => {
			if (!localStorage.token) store.dispatch({ type: LOGOUT });
		});
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route path="profiles" element={<Profiles />} />
					<Route path="profile/:id" element={<Profile />} />

					<Route
						path="dashboard"
						element={<PrivateRoute component={Dashboard} />}
					/>
					<Route
						path="create-profile"
						element={<PrivateRoute component={ProfileForm} />}
					/>
					<Route
						path="edit-profile"
						element={<PrivateRoute component={ProfileForm} />}
					/>
					<Route
						path="add-experience"
						element={<PrivateRoute component={AddExperience} />}
					/>
					<Route path="posts" element={<PrivateRoute component={Posts} />} />
					<Route path="posts/:id" element={<PrivateRoute component={Post} />} />
					<Route
						path="eventMenu"
						element={<PrivateRoute component={EventMenu} />}
					/>
					<Route
						path="eventForm"
						element={<PrivateRoute component={EventForm} />}
					/>
					<Route path="events" element={<PrivateRoute component={Events} />} />

					<Route path="/*" element={<NotFound />} />
				</Routes>
			</Router>
		</Provider>
	);
};

export default App;
