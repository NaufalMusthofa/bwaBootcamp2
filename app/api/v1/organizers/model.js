const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let organizerSchema = new Schema(
  {
    organizer: {
      type: String,
      require: [true, "nama penyelenggara harus diisi"],
    },
  },

  {
    timestamps: {
      currentTime: () => {
        const now = new Date();
        const localDate = new Date(now.getTime() + 7 * 60 * 60 * 1000);
        return localDate;
      },
    },
  }
);

module.exports = model("Organizer", organizerSchema);
