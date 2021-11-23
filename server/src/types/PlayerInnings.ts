export interface PlayerInnings {
    player: string;
    team: string;
    opposition: string;
    date: Date;
    battedFlag: boolean;
    battingStats?: PlayerBattingStats;
    bowledFlag: boolean;
    bowlingStats?: PlayerBowlingStats;
}

export interface PlayerBattingStats {
    runsScored: number;
    notOutFlag: boolean;
    ballsFaced: number;
    boundaryFours: number;
    boundarySixes: number;
    battingStrikeRate: number;
}

export interface PlayerBowlingStats {
    oversBowled: number;
    maidensBowled: number;
    runsConceded: number;
    wicketsTaken: number;
    economyRate: number;
}