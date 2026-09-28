const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    }
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;