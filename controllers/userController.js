const User = require("../models/userModel");
const { generateToken } = require("../utils/jwtUtils");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message:
          "Request body incomplete, both email and password are required",
      });
    }

    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: "User already exists",
      });
    }

    await User.createUser({ email, password });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message:
          "Request body incomplete, both email and password are required",
      });
    }

    const user = await User.findUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({
        error: true,
        message: "Incorrect email or password",
      });
    }

    const token = generateToken(user.email);
    res.status(200).json({ token, token_type: "Bearer", expires_in: 86400 });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    if (req.user && req.user.email === email) {
      // Authenticated profile

      let dob = user.dob
        ? new Date(
          user.dob.getTime() + Math.abs(user.dob.getTimezoneOffset() * 60000)
        )
          .toISOString()
          .split("T")[0]
        : null;

      res.status(200).json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: dob,
        address: user.address,
      });
    } else {
      // Public profile
      res.status(200).json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { firstName, lastName, dob, address } = req.body;

    if (!firstName || !lastName || !dob || !address) {
      return res.status(400).json({
        error: true,
        message:
          "Request body incomplete: firstName, lastName, dob and address are required.",
      });
    }

    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof address !== "string"
    ) {
      return res.status(400).json({
        error: true,
        message:
          "Request body invalid: firstName, lastName and address must be strings only.",
      });
    }

    const dobDate = new Date(dob);
    if (isNaN(dobDate) || dob !== dobDate.toISOString().split("T")[0]) {
      return res.status(400).json({
        error: true,
        message: "Invalid input: dob must be a real date in format YYYY-MM-DD.",
      });
    }

    const today = new Date();
    if (dobDate >= today) {
      return res.status(400).json({
        error: true,
        message: "Invalid input: dob must be a date in the past.",
      });
    }

    if (req.user.email !== email) {
      return res.status(403).json({
        error: true,
        message: "Forbidden",
      });
    }

    const updated = await User.updateUserProfile(email, {
      firstName,
      lastName,
      dob,
      address,
    });
    if (!updated) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    res.status(200).json({ email, firstName, lastName, dob, address });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
