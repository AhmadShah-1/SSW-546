// This data file should export all functions using the ES6 standard as shown in the lecture code
import {teams} from '../config/mongoCollections.js'
import { ObjectId } from 'mongodb';
import validation from '../validation.js'




const createGame = async (
  teamId,
  gameDate,
  opposingTeamId,
  homeOrAway,
  finalScore,
  win
) => {

    teamId, gameDate, opposingTeamId, homeOrAway, finalScore, win = validation.checkCreateGame(teamId, gameDate, opposingTeamId, homeOrAway, finalScore, win)

    const teamCollection = await teams();
    const team = await teamCollection.findOne({ _id: new ObjectId(teamId) });
    if (!team) throw 'The team does not exist';

    const opposingTeam = await teamCollection.findOne({ _id: new ObjectId(opposingTeamId) });
    if (!opposingTeam) throw 'The opposing team does not exist';


    const newGame = {
        _id: new ObjectId(),
        gameDate,
        opposingTeamId: new ObjectId(opposingTeamId),
        homeOrAway,
        finalScore,
        win
    };
    team.games.push(newGame);

    // calculate win loss
    let wins = 0
    let losses = 0
    for (const game of team.games){
        if(game.win){
            wins++;
        }else{
            losses++
        }
    }

    const winLoss = `${wins}-${losses}`

    const updateInfo = await teamCollection.updateOne(
        { _id: new ObjectId(teamId) },
        { $set: { games: team.games, winLossCount: winLoss } }
    );
    if (updateInfo.modifiedCount === 0) {
        throw 'Could not update team';
    }

    return await teamCollection.findOne({ _id: new ObjectId(teamId) });
};

const getAllGames = async (teamId) => {
    teamId = validation.checkGetAllGames(teamId)

    const teamCollection = await teams();
    const team = await teamCollection.findOne({_id: new ObjectId(teamId)});
    if(!team) throw "team does not exist";
    return team.games;
};

const getGame = async (gameId) => {
    gameId = validation.checkGetGame(gameId)

    const teamCollection = await teams();
    const team = await teamCollection.findOne(
        { 'games._id': new ObjectId(gameId) },
        {projection: {_id: 0, "games.$": 1}}
    )
    if(!team) throw "Game not found"
    return team.games[0]
};

const updateGame = async (gameId, updateObject) => {
    gameId, updateObject = validation.checkUpdateGame(gameId, updateObject);

    const teamCollection = await teams();
    const team = await teamCollection.findOne({ 'games._id': new ObjectId(gameId) });
    if (!team) throw 'Game not found';

    const gameIndex = team.games.findIndex(game => game._id.toString() === gameId);
    if (gameIndex === -1) throw 'Game not found';

    const updatedGame = { ...team.games[gameIndex], ...updateObject };
    team.games[gameIndex] = updatedGame;

    let wins = 0, losses = 0;
    for (const game of team.games) {
        if (game.win) wins++;
        else {
            losses++;
        }
    }
    team.winLossCount = `${wins}-${losses}`;

    const updateInfo = await teamCollection.updateOne(
        { _id: team._id },
        { $set: { games: team.games, winLossCount: team.winLossCount } }
    );
    if (updateInfo.modifiedCount === 0) throw 'Could not update game';

    return team;
};

const removeGame = async (gameId) => {
    const removeGame = async (gameId) => {
        gameId = validation.checkGetGame(gameId);

        const teamCollection = await teams();
        const team = await teamCollection.findOne(
            { 'games._id': new ObjectId(gameId) });

        if (!team) throw 'Game not found';

        const updatedGames = [];
        for (let i = 0; i < team.games.length; i++) {
            if (team.games[i]._id.toString() !== gameId) {
                updatedGames.push(team.games[i]);
            }
        }
        team.games = updatedGames;

        let wins = 0, losses = 0;
        for (const game of team.games) {
            if (game.win) wins++;
            else losses++;
        }
        team.winLossCount = `${wins}-${losses}`;

        const updateInfo = await teamCollection.updateOne(
            { _id: team._id },
            { $set: { games: team.games, winLossCount: team.winLossCount } }
        );
        if (updateInfo.modifiedCount === 0) throw 'Could not remove game';

        return team;
    };
};

export { createGame, getAllGames, getGame, updateGame, removeGame };
