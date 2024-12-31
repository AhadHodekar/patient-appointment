import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const adminAuthToken = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No Admin token provided!");
  }

  const token = authHeaders.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name, isAdmin: true };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized Admin");
  }
};

export default adminAuthToken;
