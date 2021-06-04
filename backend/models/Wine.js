const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const wineSchema = new Schema ({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        // Instead use Social Login? require: true;
    },
    description: {
        type: String
    }

},
{
    timestamp: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

module.exports = Wine = mongoose.model('wine', wineSchema);