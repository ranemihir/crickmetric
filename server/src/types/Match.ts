export interface Match {
    country: string;
    result: boolean;
    margin: {
        magnitude: number,
        runsOrWickes: boolean;
    };
    oppositionTeam: string;
    homeOrAway: boolean;
    ground: string;
    date: Date;
}