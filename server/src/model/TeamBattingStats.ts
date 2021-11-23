import mongoose from 'mongoose';
import { TeamBattingStats } from '../types';
const { Schema } = mongoose;


const teamBattingStatsSchema = new Schema<TeamBattingStats>({
    country: String,
    matchesPlayed: Number,
    matchesWon: Number,
    matchesLost: Number,
    matchesTied: Number,
    matchesWithNoResult: Number,
    winToLossRatio: Number,
    avgRunsPerWicketBatting: Number,
    avgRunsPerSixBallsBatting: Number,
    numberOfTeamInningsBatting: Number,
    highestTeamScoreBatting: Number,
    lowestCompletedScoreBatting: Number
});

export const teamBattingStatsModel = mongoose.model('TeamBattingStats', teamBattingStatsSchema);