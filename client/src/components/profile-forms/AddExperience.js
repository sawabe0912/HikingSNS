import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
const AddExperience = ({ addExperience }) => {
	const [formData, setFormData] = useState({
		course: "",
		location: "",
		date: "",
		description: ""
	});
	const navigate = useNavigate();
	const { course, location, date, description } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	return (
		<section className="container">
			<h1 className=" text-primary">Add your biggest challenge!</h1>
			<p className="lead">
				Add your most challenging hiking experiece that you have done! Your
				peers will see it!
			</p>
			<form
				className="form"
				onSubmit={(e) => {
					e.preventDefault();
					addExperience(formData, navigate);
				}}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Hiking course"
						name="course"
						value={course}
						onChange={onChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<h4>Date</h4>
					<input type="date" name="date" value={date} onChange={onChange} />
				</div>
				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Give your thought"
						value={description}
						onChange={onChange}
					/>
				</div>
				<input type="submit" className="btn btn-primary" />
				<Link className="btn btn-light" to="/dashboard">
					Go Back
				</Link>
			</form>
		</section>
	);
};
AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired
};
export default connect(null, { addExperience })(AddExperience);
