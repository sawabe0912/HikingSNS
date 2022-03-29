import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
const PostForm = ({ addPost }) => {
	const [text, setText] = useState("");
	return (
		<div className="post-form" style={{ width: "70%" }}>
			<div className="bg-primary p-2">
				<h3 className="text-white">Post your thought</h3>
			</div>
			<form
				className="form"
				onSubmit={(e) => {
					e.preventDefault();
					addPost({ text });
					setText("");
				}}>
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="Create a post"
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				/>
				<input
					type="submit"
					className="btn btn-dark mt-3 mb-3"
					value="Submit"
				/>
			</form>
		</div>
	);
};
PostForm.propTypes = {
	addPost: PropTypes.func.isRequired
};
export default connect(null, { addPost })(PostForm);
