const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const userSchema = new Schema ({
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        // Instead use Social Login? require: true;
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }

},
{
    timestamp: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

module.exports = User = mongoose.model('user', userSchema);