const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
    },
    adminEmail:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: [5, "Email must be at least 5 characters long"],
        match: [/\S+@\S+\.\S+/, "Email is not valid"],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        default: 'admin'
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

adminSchema.methods.generateAuthToken = function () {
    try {
        const token = jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        return token;
    } catch (error) {   
        console.error("Error generating token:", error);
        return null;
    }
}

adminSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error("Error comparing password");
    }
}

adminSchema.statics.hashpassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Error hashing password");
    }
}


module.exports = mongoose.model("Admin", adminSchema);