import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";
const Posts = ({ getPosts, post: { posts } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);
	return (
		<section className="container">
			<h1 className="text-primary postClass">Posts</h1>
			<p className="lead postClass">Welcome to the community </p>
			<PostForm />
			<div className="posts postClass" style={{ width: "91%" }}>
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</section>
	);
};
Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	post: state.post
});
export default connect(mapStateToProps, { getPosts })(Posts);
