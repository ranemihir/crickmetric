// import csv from 'csvtojson';
// import fs from 'fs';

const csv = require('csvtojson');
const fs = require('fs');


const datasetPaths = {
    playerInnings: './../../dataset/player-innings.csv',
    teamBattingStats: './../../dataset/team-batting-stats.csv',
    teamBowlingStats: './../../dataset/team-bowling-stats.csv',
    teamMatches: './../../dataset/team-matches.csv'
};

const playerInningsReadStream = fs.createReadStream(datasetPaths.playerInnings).pipe(csv());
const teamBattingStatsReadStream = fs.createReadStream(datasetPaths.teamBattingStats).pipe(csv());
const teamBowlingStatsReadStream = fs.createReadStream(datasetPaths.teamBowlingStats).pipe(csv());
const teamMatchesReadStream = fs.createReadStream(datasetPaths.teamMatches).pipe(csv());

const result = {
    playerInnings: [],
    teamBattingStats: [],
    teamBowlingStats: [],
    matches: [],
};

playerInningsReadStream.on('data', (chunk) => {
    const line = chunk.toString();
    const record = JSON.parse(line);

    const [year, month, day] = record.date.split('/');

    result.playerInnings.push({
        ...record,
        oppositionTeam: record.oppositionTeam.slice(2),
        date: new Date(`${month}/${day}/${year}`)
    });
});

export default result;
