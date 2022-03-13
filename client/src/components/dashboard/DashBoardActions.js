import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
	return (
		<div className="dash-buttons">
			<Link to="/edit-profile" className="btn btn-light mr-2">
				Edit Profile
			</Link>
			<Link to="/add-experience" className="btn btn-dark ml-2">
				Add Experience
			</Link>
		</div>
	);
};

export default DashboardActions;
