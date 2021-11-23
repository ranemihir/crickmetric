import mongoose from 'mongoose';
import { TeamStats } from '../types';
const { Schema } = mongoose;


const teamStatsSchema = new Schema<TeamStats>({
    team: String,
    batting: {
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
    },
    bowling: {
        avgRunsPerWicketBowling: Number,
        avgRunsPerSixBallsBowling: Number,
        numberOfTeamInningsBowling: Number,
        highestTeamScoreBowling: Number,
        lowestCompletedScoreBowling: Number
    }
});

export const TeamStatsModel = mongoose.model('TeamStats', teamStatsSchema);