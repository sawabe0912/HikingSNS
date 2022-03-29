import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
const CommentItem = ({
	postId,
	comment: { _id, text, user },
	auth,
	deleteComment
}) => (
	<div className="bg-white">
		<div className="commentItem mb-3">
			<p className="p-3">{text}</p>

			{!auth.loading && user === auth.user._id && (
				<button
					onClick={() => deleteComment(postId, _id)}
					type="button"
					className="btn btn-danger mb-3 ml-2">
					Delete
				</button>
			)}
		</div>
	</div>
);
CommentItem.propTypes = {
	postId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
