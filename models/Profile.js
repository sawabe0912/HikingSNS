const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	},
	location: {
		type: String
	},
	dreams: {
		type: [String],
		required: true
	},
	bio: {
		type: String
	},
	experience: [
		{
			course: {
				type: String,
				required: true
			},
			location: {
				type: String
			},
			date: {
				type: Date,
				required: true
			},
			description: {
				type: String
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("profile", ProfileSchema);
