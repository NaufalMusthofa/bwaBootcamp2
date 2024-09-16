const mongoose = require('mongoose');
const {model, Schema} = mongoose;

let imageSchema = new Schema(
    {
        name: {
            type: String
        },
    },

    {timestamps: {
        currentTime: () => {
            const now = new Date();
            const localDate = new Date(now.getTime() + (7 * 60 * 60 * 1000));
            return localDate;
        }
    }}
)

// export model image
module.exports = model('Image', imageSchema);