export interface PlayerInning {
    player: string;
    country: string;
    oppositionTeam: string;
    ground: string;
    date: Date;
    battedFlag: boolean;
    battingStat?: PlayerBattingStat;
    bowledFlag: boolean;
    bowlingStat?: PlayerBowlingStat;
}

export interface PlayerBattingStat {
    runsScored: number;
    notOutFlag: boolean;
    ballsFaced: number;
    boundaryFours: number;
    boundarySixes: number;
    battingStrikeRate: number;
}

export interface PlayerBowlingStat {
    oversBowled: number;
    maidensBowled: number;
    runsConceded: number;
    wicketsTaken: number;
    economyRate: number;
}