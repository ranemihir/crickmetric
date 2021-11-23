export interface Match {
    team: string;
    result: boolean;
    margin: {
        magnitude: number,
        runsOrWickes: boolean;
    };
    opposition: string;
    homeOrAway: boolean;
    ground: string;
    date: Date;
}