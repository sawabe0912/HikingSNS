import React from "react";
import { Link } from "react-router-dom";

const EventMenu = () => {
	return (
		<section className="container">
			<h1 className="text-primary">Events</h1>
			<p className="lead">
				You can create a new hiking event or check the list of hiking events!
			</p>

			<div className="choices">
				<Link to={`/eventform`} className="btn btn-primary bigBtn mr-1">
					<p className="btnText">Create Event</p>
					<p>🛠</p>
				</Link>

				<Link to={`/events`} className="btn btn-light bigBtn ml-1">
					<p className="btnText">Check Events</p>
					<p>🔍 </p>
				</Link>
			</div>
		</section>
	);
};

export default EventMenu;
