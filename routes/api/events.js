const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Event = require("../../models/Event");
const User = require("../../models/User");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/events
// @desc     Create a event
// @access   Private
router.post(
	"/",
	auth,
	//check("text", "Text is required").notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");

			const newEvent = new Event({
				date: req.body.date,
				eventName: req.body.eventName,
				location: req.body.location,
				startTime: req.body.startTime,
				length: req.body.length,
				description: req.body.description,
				user: req.user.id
			});

			const event = await newEvent.save();

			res.json(event);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route    GET api/events
// @desc     Get all events
// @access   Private
router.get("/", auth, async (req, res) => {
	try {
		const events = await Event.find().sort({ date: -1 });
		res.json(events);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/events/:id
// @desc     Get event by ID
// @access   Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);

		if (!event) {
			return res.status(404).json({ msg: "Post not found" });
		}

		res.json(event);
	} catch (err) {
		console.error(err.message);

		res.status(500).send("Server Error");
	}
});

// @route    PUT api/events/join/:id
// @desc     add join to event
// @access   Private
router.put("/join/:id", auth, checkObjectId("id"), async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);

		// Check if the event has already been joined
		if (event.joins.some((join) => join.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: "Post already joined" });
		}

		event.joins.unshift({ user: req.user.id });

		await event.save();

		return res.json(event.joins);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    PUT api/events/interest/:id
// @desc     add interest to event
// @access   Private
router.put("/interest/:id", auth, checkObjectId("id"), async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);

		// Check if the event has already been interested
		if (
			event.interests.some(
				(interest) => interest.user.toString() === req.user.id
			)
		) {
			return res.status(400).json({ msg: "Post already interested" });
		}

		event.interests.unshift({ user: req.user.id });

		await event.save();

		return res.json(event.interests);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
