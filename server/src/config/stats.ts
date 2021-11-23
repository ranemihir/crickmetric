import csv from 'csvtojson';
import fs from 'fs';
import { Match, PlayerBattingStat, PlayerBowlingStat, PlayerInning, Stats, TeamBattingStat, TeamBowlingStat } from '../types';


const datasetPaths = {
    playerInnings: './../../dataset/player-innings.csv',
    teamBattingStats: './../../dataset/team-batting-stats.csv',
    teamBowlingStats: './../../dataset/team-bowling-stats.csv',
    matches: './../../dataset/matches.csv'
};


const playerInningsReadStream = fs.createReadStream(datasetPaths.playerInnings).pipe(csv());
const teamBattingStatsReadStream = fs.createReadStream(datasetPaths.teamBattingStats).pipe(csv());
const teamBowlingStatsReadStream = fs.createReadStream(datasetPaths.teamBowlingStats).pipe(csv());
const matchesReadStream = fs.createReadStream(datasetPaths.matches).pipe(csv());


const utils = {
    getJson: (chunk: Buffer) => JSON.parse(chunk.toString()),
    getBoolean: (val: string) => ((val === '1') ? true : false),
    getDate: (val: string) => {
        const [year, month, day] = val.split('/');
        return new Date(`${month}/${day}/${year}`);
    }
};


const stats: Stats = {
    playerInnings: [],
    teamBattingStats: [],
    teamBowlingStats: [],
    matches: [],
};

playerInningsReadStream.on('data', (chunk) => {
    const record = utils.getJson(chunk);

    const playerInning: PlayerInning = {
        player: record.player,
        country: record.country,
        oppositionTeam: record.oppositionTeam.slice(2),
        ground: record.ground,
        date: utils.getDate(record.date),
        battedFlag: utils.getBoolean(record.battedFlag),
        bowledFlag: utils.getBoolean(record.bowledFlag)
    };

    if (playerInning.battedFlag) {
        playerInning.battingStat = {
            runsScored: Number(record.runsScored),
            notOutFlag: utils.getBoolean(record.notOutFlag),
            ballsFaced: Number(record.ballsFaced),
            boundaryFours: Number(record.boundaryFours),
            boundarySixes: Number(record.boundarySixes),
            battingStrikeRate: Number(record.battingStrikeRate)
        } as PlayerBattingStat;
    }

    if (playerInning.bowledFlag) {
        playerInning.bowlingStat = {
            oversBowled: Number(record.oversBowled),
            maidensBowled: Number(record.maidensBowled),
            runsConceded: Number(record.runsConceded),
            wicketsTaken: Number(record.wicketsTaken),
            economyRate: Number(record.economyRate)
        } as PlayerBowlingStat;
    }

    stats.playerInnings.push(playerInning);
});

teamBattingStatsReadStream.on('data', (chunk) => {
    const record = utils.getJson(chunk);

    const teamBattingStat: TeamBattingStat = {
        country: record.country,
        matchesPlayed: Number(record.matchesPlayed),
        matchesWon: Number(record.matchesWon),
        matchesLost: Number(record.matchesLost),
        matchesTied: Number(record.matchesTied),
        matchesWithNoResult: Number(record.matchesWithNoResult),
        winToLossRatio: Number(record.winToLossRatio),
        avgRunsPerWicketBatting: Number(record.avgRunsPerWicketBatting),
        avgRunsPerSixBallsBatting: Number(record.avgRunsPerSixBallsBatting),
        numberOfTeamInningsBatting: Number(record.numberOfTeamInningsBatting),
        highestTeamScoreBatting: Number(record.highestTeamScoreBatting),
        lowestCompletedScoreBatting: Number(record.lowestCompletedScoreBatting)
    };

    stats.teamBattingStats.push(teamBattingStat);
});

teamBowlingStatsReadStream.on('data', (chunk) => {
    const record = utils.getJson(chunk);

    const teamBowlingStat: TeamBowlingStat = {
        country: record.country,
        avgRunsPerWicketBowling: Number(record.avgRunsPerWicketBowling),
        avgRunsPerSixBallsBowling: Number(record.avgRunsPerSixBallsBowling),
        numberOfTeamInningsBowling: Number(record.numberOfTeamInningsBowling),
        highestTeamScoreBowling: Number(record.highestTeamScoreBowling),
        lowestCompletedScoreBowling: Number(record.lowestCompletedScoreBowling)
    };

    stats.teamBowlingStats.push(teamBowlingStat);
});

matchesReadStream.on('data', (chunk) => {
    const record = utils.getJson(chunk);

    const match: Match = {
        country: record.country,
        result: ((record.result === 'Won') ? true : false),
        margin: {
            magnitude: Number(record.margin.split(' ')[0]),
            runsOrWickes: ((record.margin.split(' ')[1] === 'runs') ? true : false)
        },
        oppositionTeam: ((record.country === record.team1) ? record.team2 : record.team1),
        homeOrAway: ((record.homeOrAway === 'Home') ? true : false),
        ground: record.ground,
        date: utils.getDate(record.date)
    };

    stats.matches.push(match);
});


export default stats;
