const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	date: {
		type: String,
		required: true
	},
	eventName: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	startTime: {
		type: String,
		required: true
	},
	length: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	joins: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			}
		}
	],
	interests: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			}
		}
	]
});

module.exports = mongoose.model("event", EventSchema);
