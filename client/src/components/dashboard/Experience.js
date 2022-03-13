import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
import "bootstrap/dist/css/bootstrap.min.css";

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td className="hide-sm">{exp.course}</td>
			<td className="hide-sm">{exp.location}</td>
			<td>
				<button
					onClick={() => deleteExperience(exp._id)}
					className="btn btn-danger">
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 className="">Past hikes</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Hiking</th>
						<th className="hide-sm">Location</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
