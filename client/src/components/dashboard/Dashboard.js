import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardActions from "./DashBoardActions";
import Experience from "./Experience";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return (
		<section className="container">
			<h1 className="text-primary">Dashboard</h1>
			<p className="lead">Welcome {user && user.name}</p>
			{profile !== null ? (
				<>
					<DashboardActions />
					<Experience experience={profile.experience} />

					<div className="">
						<button className="btn btn-danger" onClick={() => deleteAccount()}>
							Delete My Account
						</button>
					</div>
				</>
			) : (
				<>
					<p>You have not yet setup a profile, please add some info</p>
					<Link to="/create-profile" className="btn btn-primary">
						Create Profile
					</Link>
				</>
			)}
		</section>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
