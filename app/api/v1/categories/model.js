const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, "Panjang nama kategori minimal 3 karakter"],
      maxlength: [36, "panjang nama katgori maksimal 20 karakter"],
      require: [true, "nama kategori harus diisi"],
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      require: true,
    },
  },

  {
    timestamps: {
      currentTime: () => {
        const now = new Date();
        const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
        return localTime;
      },
    },
  }
);

module.exports = model("Category", categorySchema);
