const express = require("express");
const router = express.Router();
const request = require("request");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const User = require("../../models/User");
const config = require("config");

// @route    GET api/profile/me
// @desc     get current user profile
//@access    Private

router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id
		}).populate("user", ["name", "avatar"]);

		if (!profile) {
			return res.status(400).json({ msg: "There is no profile for this user" });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    POST api/profile
// @desc     Create or update user profile
//@access    Private

router.post("/", [auth, []], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { level, location, dreams, bio } = req.body;
	const profileFields = {};
	profileFields.user = req.user.id;
	if (level) profileFields.level = level;
	if (location) profileFields.location = location;
	if (dreams) profileFields.dreams = dreams;
	if (bio) profileFields.bio = bio;

	try {
		let profile = await Profile.findOne({
			user: req.user.id
		});

		if (profile) {
			//updating existing profile
			profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true }
			);

			return res.json(profile);
		}
		//creating new profile
		profile = new Profile(profileFields);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/profile
// @desc     Get all profiles
//@access    Public

router.get("/", async (req, res) => {
	try {
		const profiles = await Profile.find().populate("user", ["name", "avatar"]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/profile/user/:user_id
// @desc     Get profiles by user ID
//@access    Public

router.get("/user/:user_id", async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id
		}).populate("user", ["name", "avatar"]);

		if (!profile) {
			return res.status(400).json({ msg: "Profile not found" });
		}

		res.json(profile);
	} catch (err) {
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "Profile not found" });
		}
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    DELETE api/profile
// @desc     Delete profile,user and posts
//@access    Private

router.delete("/", auth, async (req, res) => {
	try {
		//deleting Posts
		await Post.deleteMany({ user: req.user.id });
		//deleting Profile
		await Profile.findOneAndRemove({ user: req.user.id });

		//deleting User
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: "User Deleted" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    Put api/profile/experience
// @desc     Adding experience in profile
// @access   Private

router.put("/experience", [
	auth,
	[],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}
		const { course, location, date, description } = req.body;

		const newExp = {
			course,
			location,
			date,
			description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.experience.unshift(newExp);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
]);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Deleting experience in profile
// @access   Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		//get remove index
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
