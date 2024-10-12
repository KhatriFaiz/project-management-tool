import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const router = Router();

const loginSchemaZod = z.object({
  email: z.string(),
  password: z.string(),
});

router.post("/login", async (req, res) => {
  try {
    const validatedLoginData = loginSchemaZod.parse(req.body);

    // Find the user in the database
    const user = await User.findOne({ email: validatedLoginData.email });

    // If the user is not found, return an error
    if (!user) {
      return res
        .status(401)
        .json({ sucess: false, message: "Invalid email or password" });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      validatedLoginData.password,
      user.password
    );

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ sucess: false, message: "Invalid email or password" });
    }

    // Generate a JWT for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res
        .status(400)
        .send({ success: false, message: "Invalid input. " + error.message });
    }
    return res.status(500).json({ sucess: false, message: error.message });
  }
});

export default router;
