import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addJoin } from "../../actions/event";
import { addInterest } from "../../actions/event";

const EventItem = ({
	addJoin,
	addInterest,
	event: {
		eventName,
		startTime,
		location,
		length,
		description,
		_id,
		joins,
		interests
	}
}) => (
	<div className="event bg-white">
		<div className="containerList">
			<p className="">
				Event name: <strong>{eventName}</strong>
			</p>
			<p className="">
				Location: <strong> {location}</strong>
			</p>
			<p className="">
				Meeting time: <strong>{startTime}</strong>
			</p>
			<p className="">
				Total hours: <strong>{length}</strong>
			</p>
			<p className="">
				Description: <strong>{description}</strong>
			</p>
			<div className="ml-3">
				<button
					onClick={() => addInterest(_id)}
					type="button"
					className="btn btn-warning mb-3 mr-1">
					{"Interested"}🤩
					<span>{interests.length > 0 && <span>{interests.length}</span>}</span>
				</button>
				<button
					onClick={() => addJoin(_id)}
					type="button"
					className="btn btn-info mb-3 mr-1">
					{"Join"}✋
					<span>{joins.length > 0 && <span>{joins.length}</span>}</span>
				</button>
			</div>
		</div>
	</div>
);

EventItem.propTypes = {
	event: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addInterest: PropTypes.func.isRequired,
	addJoin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addJoin, addInterest })(EventItem);
