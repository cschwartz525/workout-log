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

const workoutSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    date: Date,
    duration: Number,
    type: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const User = models.User || model('User', userSchema);

export const Workout = models.Workout || model('Workout', workoutSchema);
