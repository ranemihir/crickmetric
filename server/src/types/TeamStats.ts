export interface TeamStats {
    team: string;
    batting: TeamBattingStats,
    bowling: TeamBowlingStats;
}

export interface TeamBattingStats {
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
    avgRunsPerWicketBowling: number;
    avgRunsPerSixBallsBowling: number;
    numberOfTeamInningsBowling: number;
    highestTeamScoreBowling: number;
    lowestCompletedScoreBowling: number;
}