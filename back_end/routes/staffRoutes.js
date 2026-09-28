const express = require("express");
const Staff = require("../models/staff");
const Student = require("../models/student");


const router = express.Router();

// ===============================
// STAFF REGISTRATION
// ===============================
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, department, phone } = req.body;

        const existingStaff = await Staff.findOne({ email });

        if (existingStaff) {
            return res.status(400).json({
                message: "Staff already exists"
            });
        }

        const staff = new Staff({
            name,
            email,
            password,
            department,
            phone
        });

        await staff.save();

        res.status(201).json({
            message: "Staff registered successfully",
            staff
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
});


// ===============================
// STAFF LOGIN
// ===============================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const staff = await Staff.findOne({ email });

        if (!staff) {
            return res.status(404).json({
                message: "Staff not found"
            });
        }

        if (staff.password !== password) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        res.status(200).json({
            message: "Staff login successful",
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                department: staff.department,
                phone: staff.phone
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
});

// ===============================
// UPDATE STAFF PROFILE
// ===============================
router.put("/profile/:id", async (req, res) => {
    try {
        const { name, department, phone } = req.body;

        const staff = await Staff.findById(req.params.id);

        if (!staff) {
            return res.status(404).json({
                message: "Staff not found"
            });
        }

        staff.name = name || staff.name;
        staff.department = department || staff.department;
        staff.phone = phone || staff.phone;

        await staff.save();

        res.status(200).json({
            message: "Staff profile updated successfully",
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                department: staff.department,
                phone: staff.phone
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Profile update failed",
            error: error.message
        });
    }
});

// ===============================
// VIEW ALL STUDENTS
// ===============================
router.get("/students", async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            message: "Students fetched successfully",
            students
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch students",
            error: error.message
        });
    }
});

module.exports = router;