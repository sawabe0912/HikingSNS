import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEvent } from "../../actions/event";
import { useNavigate } from "react-router-dom";

const EventForm = ({ addEvent }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		date: "",
		eventName: "",
		location: "",
		startTime: "",
		length: "",
		description: ""
	});

	const { date, eventName, location, startTime, length, description } =
		formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<div className="post-form">
			<div>
				<h3 style={{ marginTop: "100px" }} className="text-primary">
					Creat New Hiking Event
				</h3>
			</div>
			<form
				className="form"
				onSubmit={(e) => {
					e.preventDefault();
					addEvent(formData, navigate);
				}}>
				<div>
					<input
						type="date"
						id="date"
						className="m-3"
						name="date"
						value={date}
						min="2022-03-01"
						max="2022-12-31"
						required
						onChange={onChange}></input>
				</div>

				<div>
					<input
						type="eventName"
						id="eventName"
						className="m-3"
						value={eventName}
						placeholder="Event name"
						name="eventName"
						required
						onChange={onChange}></input>
				</div>

				<div>
					<input
						type="location"
						id="location"
						className="m-3"
						name="location"
						value={location}
						required
						placeholder="Location"
						onChange={onChange}></input>
				</div>

				<div>
					<label className="ml-3">Time to start:</label>
					<input
						type="time"
						id="startTime"
						className="m-3"
						name="startTime"
						value={startTime}
						onChange={onChange}></input>
				</div>
				<div>
					<input
						type="length"
						id="length"
						className="m-3"
						value={length}
						name="length"
						placeholder="Total time"
						required
						onChange={onChange}></input>
				</div>
				<div>
					<textarea
						name="description"
						cols="30"
						className="m-3"
						value={description}
						rows="5"
						placeholder="Description here"
						required
						onChange={onChange}
					/>
				</div>

				<input type="submit" className="btn btn-dark ml-3" value="Submit" />
			</form>
		</div>
	);
};

EventForm.propTypes = {
	addEvent: PropTypes.func.isRequired
};

export default connect(null, { addEvent })(EventForm);
