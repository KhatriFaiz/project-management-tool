import { z } from "zod";
import jwt from "jsonwebtoken";
import User from "../../models/User.model.js";
import bcrypt from "bcrypt";

const userSchemaZod = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export default async function createUserWithEmailAndPassword(userData) {
  const validatedUserData = userSchemaZod.parse(userData);

  const hashedPassword = await bcrypt.hash(validatedUserData.password, 10);

  const user = new User({
    name: validatedUserData.name,
    username: validatedUserData.username,
    email: validatedUserData.email,
    password: hashedPassword,
  });

  await user.save();

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { user, token };
}
