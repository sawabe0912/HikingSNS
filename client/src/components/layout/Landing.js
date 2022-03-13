import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const Landing = ({ isAuthenticated }) => {
	return (
		<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1>Let's go to mountains!</h1>

					<p className="lead">
						Join Hiking community! You can create account and post your daily
						hiking record
					</p>
					{isAuthenticated ? (
						""
					) : (
						<div className="buttons">
							<Link to="/register" className="btn btn-primary mr-2">
								Sign Up
							</Link>
							<Link to="/login" className="btn btn-light ml-2">
								Login
							</Link>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Landing);
