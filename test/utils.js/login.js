import { faker } from '@faker-js/faker';
import jwt from "jsonwebtoken";

const generateToken = () => {
  const email = faker.internet.email();
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export { generateToken };
