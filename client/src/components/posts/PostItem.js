import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike } from "../../actions/post";
const PostItem = ({
	addLike,
	post: { _id, text, name, avatar, likes, comments },
	showActions
}) => (
	<div className="post bg-white">
		<div>
			<img className="image ml-4" src={avatar} />
			<h4 className="image ml-4">{name}</h4>
		</div>
		<div className="rightSide">
			<p className="mb-3 mt-3 ml-3 lr-3 textSec p-3">{text}</p>

			{showActions && (
				<div className="ml-3">
					<button
						onClick={() => addLike(_id)}
						type="button"
						className="btn btn-light mb-3 mr-1">
						{"Like"}👍
						<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
					</button>
					<Link to={`/posts/${_id}`} className="btn btn-primary mb-3 ml-1">
						Discussion{" "}
						{comments.length > 0 && (
							<span className="comment-count">{comments.length}</span>
						)}
					</Link>
				</div>
			)}
		</div>
	</div>
);
PostItem.defaultProps = {
	showActions: true
};
PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	showActions: PropTypes.bool
};
const mapStateToProps = (state) => ({
	auth: state.auth
});
export default connect(mapStateToProps, { addLike })(PostItem);
