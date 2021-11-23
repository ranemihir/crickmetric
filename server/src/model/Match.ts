import mongoose from 'mongoose';
import { Match } from '../types';
const { Schema } = mongoose;


const matchSchema = new Schema<Match>({
    team: String,
    result: Boolean,
    margin: {
        magnitude: Number,
        runsOrWickes: Boolean
    },
    opposition: String,
    homeOrAway: Boolean,
    ground: String,
    date: Date
});

export const MatchModel = mongoose.model('Match', matchSchema);