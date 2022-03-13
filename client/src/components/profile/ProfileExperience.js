import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
	experience: { course, location, date, description }
}) => {
	return (
		<div>
			<p>
				<strong>Hiking Course: </strong>
				{course}
			</p>
			<p>
				<strong>Date:</strong> <Moment format="DD/MM/YYYY">{date}</Moment>{" "}
			</p>
			<p>
				<strong>Location: </strong>
				{location}
			</p>
			<p>
				<strong>Description: </strong>
				{description}
			</p>
		</div>
	);
};

ProfileExperience.propTypes = { experience: PropTypes.array.isRequired };

export default ProfileExperience;
