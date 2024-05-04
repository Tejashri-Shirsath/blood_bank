const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });

        // Validation
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already exists"
            });
        }

        // Hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // Save user
        const user = new userModel(req.body);
        await user.save();

        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in register",
            error
        });
    }
};

const loginController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });

        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        const comparePassword = await bcrypt.compare(req.body.password, existingUser.password);

        if (!comparePassword) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).send({
            success: true,
            message: "Login successfully",
            token,
            user: existingUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        });
    }
};

module.exports = { registerController, loginController };
