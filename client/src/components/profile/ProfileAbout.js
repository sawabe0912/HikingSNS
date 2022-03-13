import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
	profile: {
		bio,
		dreams,
		user: { name }
	}
}) => {
	console.log(bio, dreams, name);
	return (
		<div className="profile-about bg-light p-2">
			{bio && (
				<Fragment>
					<h2 className="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
					<p>{bio}</p>
					<div className="line" />
				</Fragment>
			)}

			<div className="dream">
				{dreams.map((dream, index) => (
					<div key={index} className="p-1">
						{dream}
					</div>
				))}
			</div>
		</div>
	);
};
ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
