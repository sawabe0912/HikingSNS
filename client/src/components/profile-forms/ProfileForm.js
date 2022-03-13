import React, { useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const initialState = {
	location: "",
	status: "",
	dream: "",
	bio: ""
};

const ProfileForm = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile
}) => {
	const [formData, setFormData] = useState(initialState);

	const creatingProfile = useMatch("/create-profile");

	const navigate = useNavigate();

	useEffect(() => {
		if (!profile) getCurrentProfile();

		if (!loading && profile) {
			const profileData = { ...initialState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			for (const key in profile.social) {
				if (key in profileData) profileData[key] = profile.social[key];
			}

			if (Array.isArray(profileData.dream))
				profileData.dream = profileData.dream.join(", ");

			setFormData(profileData);
		}
	}, [loading, getCurrentProfile, profile]);

	const { location, status, dream, bio } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, navigate, profile ? true : false);
	};

	return (
		<section className="container">
			<h1 className="text-primary">
				{creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
			</h1>
			<p className="lead">
				{creatingProfile
					? ` Let's get some information to make your profile`
					: " Add some changes to your profile"}
			</p>
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<select name="status" value={status} onChange={onChange}>
						<option>Choose your hiking level</option>
						<option value="Beginner">Beginner</option>
						<option value="Elementary">Elementary</option>
						<option value="Intermediate">Intermediate</option>
						<option value="Advanced">Advanced</option>
						<option value="Expert">Expert</option>
					</select>
					<small className="form-text">Tell us your level</small>
				</div>

				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={onChange}
					/>
					<small className="form-text">Your Address</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Your Dream mountain"
						name="dream"
						value={dream}
						onChange={onChange}
					/>
					<small className="form-text">
						Tell us the mountain that you want to achieve!
					</small>
				</div>
				<div className="form-group">
					<textarea
						placeholder="A short bio of yourself"
						name="bio"
						value={bio}
						onChange={onChange}
					/>
					<small className="form-text">Tell us a little about yourself</small>
				</div>

				<input type="submit" className="btn btn-primary" />
				<Link className="btn btn-light" to="/dashboard">
					Go Back
				</Link>
			</form>
		</section>
	);
};

ProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	ProfileForm
);
