const Users = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createJWT, createTokenUser } = require("../../utils");

const signin = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email or password");
  }

  const result = await Users.findOne({ email: email });
  if (!result) {
    throw new UnauthorizedError("invalid credentials");
  }

  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("invalid credentials");
  }

  const token = createJWT({ payload: createTokenUser(result) });
  return token;
};

module.exports = {
    signin,

}
