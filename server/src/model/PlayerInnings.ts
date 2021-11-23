import mongoose from 'mongoose';
import { PlayerInnings } from '../types';
const { Schema } = mongoose;


const playerInningsSchema = new Schema<PlayerInnings>({
    player: String,
    country: String,
    oppositionTeam: String,
    date: Date,
    battedFlag: Boolean,
    battingStats: {
        runsScored: Number,
        notOutFlag: Boolean,
        ballsFaced: Number,
        boundaryFours: Number,
        boundarySixes: Number,
        battingStrikeRate: Number
    },
    bowledFlag: Boolean,
    bowlingStats: {
        oversBowled: Number,
        maidensBowled: Number,
        runsConceded: Number,
        wicketsTaken: Number,
        economyRate: Number
    }
});

export const PlayerInningsModel = mongoose.model('PlayerInnings', playerInningsSchema);