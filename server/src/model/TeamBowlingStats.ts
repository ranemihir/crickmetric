import mongoose from 'mongoose';
import { TeamBowlingStats } from '../types';
const { Schema } = mongoose;


const teamBowlingStatsSchema = new Schema<TeamBowlingStats>({
    country: String,
    avgRunsPerWicketBowling: Number,
    avgRunsPerSixBallsBowling: Number,
    numberOfTeamInningsBowling: Number,
    highestTeamScoreBowling: Number,
    lowestCompletedScoreBowling: Number
});

export const teamBowlingStatsModel = mongoose.model('Match', teamBowlingStatsSchema);