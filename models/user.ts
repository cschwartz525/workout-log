import { model, models, Schema } from 'mongoose';

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    weeklyTarget: Number,
    workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }]
});

const User = models.User || model('User', userSchema);

export default User;