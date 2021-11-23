import mongoose from 'mongoose';
import { Match } from '../types';
const { Schema } = mongoose;


const matchSchema = new Schema<Match>({
    country: String,
    result: Boolean,
    margin: {
        magnitude: Number,
        runsOrWickes: Boolean
    },
    oppositionTeam: String,
    homeOrAway: Boolean,
    ground: String,
    date: Date
});

export const matchModel = mongoose.model('Match', matchSchema);