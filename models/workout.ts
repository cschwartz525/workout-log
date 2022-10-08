import { model, models, Schema } from 'mongoose';

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

const Workout = models.Workout || model('Workout', workoutSchema);

export default Workout;