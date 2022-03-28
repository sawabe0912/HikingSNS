import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileItem = ({
	profile: {
		user: { _id, name, avatar },
		location,
		dream
	}
}) => {
	return (
		<div className="card">
			<img src={avatar} alt="" className="card-img-top" width="200" height="200"/>
			<div className="card-body">
				<h2 className="card-title">{name}</h2>
				<p className="card-text">{location && <span>{location}</span>}</p>
				<Link to={`/profile/${_id}`} className="btn btn-primary">
					View Profile
				</Link>
				<p className=""> {dream}</p>
			</div>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
