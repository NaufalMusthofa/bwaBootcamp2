const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const talentSchema = new Schema (
    {
        name: {
            type: String,
            require: [true, 'nama harus diisi']
        },
        role: {
            type: String,
            default: '-'
        },
        // kita akan membuat relasi pada mongo db kita perlu types ObjectId
        image: {
            type: mongoose.Types.ObjectId,
            ref: 'Image', // ini harus sama dengan yanga ada di model Image
            require: true
        },
    },

    {timestamps: {
        currentTime: () => {
            const now = new Date();
            const localDate = (now.getTime() + (7 * 60 * 60 * 1000));
        },
    }},
);

module.exports = model('Talent', talentSchema);