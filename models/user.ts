import { model, models, Schema } from 'mongoose';

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: String
});

const User = models.User || model('User', userSchema);

export default User;