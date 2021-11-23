import csv from 'csvtojson';
import fs from 'fs';
import { Match, PlayerBattingStats, PlayerBowlingStats, PlayerInnings, TeamBattingStats, TeamBowlingStats } from '../types';
import { matchModel, playerInningsModel, teamBattingStatsModel, teamBowlingStatsModel } from '../model';

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

playerInningsReadStream.on('data', async (chunk) => {
    try {
        const record = utils.getJson(chunk);

        const playerInnings: PlayerInnings = {
            player: record.player,
            country: record.country,
            oppositionTeam: record.oppositionTeam.slice(2),
            ground: record.ground,
            date: utils.getDate(record.date),
            battedFlag: utils.getBoolean(record.battedFlag),
            bowledFlag: utils.getBoolean(record.bowledFlag)
        };

        if (playerInnings.battedFlag) {
            playerInnings.battingStats = {
                runsScored: Number(record.runsScored),
                notOutFlag: utils.getBoolean(record.notOutFlag),
                ballsFaced: Number(record.ballsFaced),
                boundaryFours: Number(record.boundaryFours),
                boundarySixes: Number(record.boundarySixes),
                battingStrikeRate: Number(record.battingStrikeRate)
            } as PlayerBattingStats;
        }

        if (playerInnings.bowledFlag) {
            playerInnings.bowlingStats = {
                oversBowled: Number(record.oversBowled),
                maidensBowled: Number(record.maidensBowled),
                runsConceded: Number(record.runsConceded),
                wicketsTaken: Number(record.wicketsTaken),
                economyRate: Number(record.economyRate)
            } as PlayerBowlingStats;
        }

        const playerInningsDoc = new playerInningsModel(playerInnings);
        await playerInningsDoc.save();
    } catch (err) {
        console.error(err);
    }
});

teamBattingStatsReadStream.on('data', async (chunk) => {
    try {
        const record = utils.getJson(chunk);

        const teamBattingStats: TeamBattingStats = {
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

        const teamBattingStatsDoc = new teamBattingStatsModel(teamBattingStats);
        await teamBattingStatsDoc.save();
    } catch (err) {
        console.error(err);
    }
});

teamBowlingStatsReadStream.on('data', async (chunk) => {
    try {
        const record = utils.getJson(chunk);

        const teamBowlingStats: TeamBowlingStats = {
            country: record.country,
            avgRunsPerWicketBowling: Number(record.avgRunsPerWicketBowling),
            avgRunsPerSixBallsBowling: Number(record.avgRunsPerSixBallsBowling),
            numberOfTeamInningsBowling: Number(record.numberOfTeamInningsBowling),
            highestTeamScoreBowling: Number(record.highestTeamScoreBowling),
            lowestCompletedScoreBowling: Number(record.lowestCompletedScoreBowling)
        };

        const teamBowlingStatsDoc = new teamBowlingStatsModel(teamBowlingStats);
        await teamBowlingStatsDoc.save();
    } catch (err) {
        console.error(err);
    }
});

matchesReadStream.on('data', async (chunk) => {
    try {
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

        const matchDoc = new matchModel(match);
        await matchDoc.save();
    } catch (err) {
        console.error(err);
    }
});
