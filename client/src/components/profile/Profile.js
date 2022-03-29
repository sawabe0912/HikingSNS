import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import { getProfileById } from "../../actions/profile";
const Profile = ({ getProfileById, profile: { profile }, auth }) => {
	const { id } = useParams();
	useEffect(() => {
		getProfileById(id);
	}, [getProfileById, id]);
	console.log(profile);
	return (
		<section className="container">
			{profile === null ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/profiles" className="btn btn-light mr-2 mb-3">
						Back To Profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to="/edit-profile" className="btn btn-dark ml-2 mb-3">
								Edit Profile
							</Link>
						)}
					<div className="">
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className="profile-exp bg-white p-2">
							<h2 className="text-primary">Experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map((experience) => (
										<ProfileExperience
											key={experience._id}
											experience={experience}
										/>
									))}
								</Fragment>
							) : (
								<h4>No experience credentials</h4>
							)}
						</div>
					</div>
				</Fragment>
			)}
		</section>
	);
};
Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});
export default connect(mapStateToProps, { getProfileById })(Profile);
