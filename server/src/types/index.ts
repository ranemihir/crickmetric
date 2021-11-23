import { Match } from './Match';
import { PlayerInning, PlayerBattingStat, PlayerBowlingStat } from './PlayerInning';
import { TeamBattingStat } from './TeamBattingStat';
import { TeamBowlingStat } from './TeamBowlingStat';

interface Stats {
    matches: Match[];
    playerInnings: PlayerInning[];
    teamBattingStats: TeamBattingStat[];
    teamBowlingStats: TeamBowlingStat[];
}

export {
    Match,
    PlayerInning,
    PlayerBattingStat,
    PlayerBowlingStat,
    TeamBattingStat,
    TeamBowlingStat,
    Stats
};