const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createOrganizer = async (req) => {
  const { organizer, name, email, password, confirmPassword, role } = req.body;
  //   buat kondisi password, jadi harus sama dengan confirmPassword, kalau tidak sama, maka
  if (password !== confirmPassword) {
    throw new BadRequestError("password dan confirmPassword tidak cocok!");
  }

  const result = await Organizers.create({ organizer });

  const users = await Users.create({
    name,
    email,
    password,
    organizer: result._id,
    role,
  });

  //   mendelete si password nya di organizers yang mana nanti diganti dengan hash password
  delete users._doc.password;

  return users;
};

module.exports = {
  createOrganizer,
};
