import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EventItem from "./EventItem";
import { getEvents } from "../../actions/event";

const Events = ({ getEvents, event: { events } }) => {
	useEffect(() => {
		getEvents();
	}, [getEvents]);
	return (
		<section className="container">
			<h1 className="large text-primary">List of Events</h1>
			<p className="lead">You can find the fun hiking event here!</p>
			<div className="events">
				{events.map((event) => (
					<EventItem key={event._id} event={event} />
				))}
			</div>
		</section>
	);
};

Events.propTypes = {
	getEvents: PropTypes.func.isRequired,
	event: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	event: state.event
});

export default connect(mapStateToProps, { getEvents })(Events);
