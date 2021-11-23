export interface TeamBattingStat {
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