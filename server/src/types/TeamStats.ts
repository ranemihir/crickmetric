export interface TeamStats {
    batting: TeamBattingStats,
    bowling: TeamBowlingStats;
}

export interface TeamBattingStats {
    country: string;
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    matchesTied: number;
    matchesWithNoResult: number;
    winToLossRatio: number;
    avgRunsPerWicketBatting: number;
    avgRunsPerSixBallsBatting: number;
    numberOfTeamInningsBatting: number;
    highestTeamScoreBatting: number;
    lowestCompletedScoreBatting: number;
}

export interface TeamBowlingStats {
    country: string;
    avgRunsPerWicketBowling: number;
    avgRunsPerSixBallsBowling: number;
    numberOfTeamInningsBowling: number;
    highestTeamScoreBowling: number;
    lowestCompletedScoreBowling: number;
}