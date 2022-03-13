import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
	return (
		<nav className="navbar">
			<h2 className="navTitle">
				<Link to="/">Hiking Community</Link>
			</h2>
			<ul>
				<li>
					<Link to="/profiles">Hikers</Link>
				</li>
				<li>
					<Link to="/eventMenu">Events</Link>
				</li>
				<li>
					<Link to="/posts">Posts</Link>
				</li>
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
				{isAuthenticated ? (
					<li>
						<a href="#!" onClick={logout}>
							Logout
						</a>
					</li>
				) : (
					<li>
						<Link to="/login">Login</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
