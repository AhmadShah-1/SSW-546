// This data file should export all functions using the ES6 standard as shown in the lecture code
import {teams} from '../config/mongoCollections.js'
import { ObjectId } from 'mongodb';
import validation from '../validation.js'


const createTeam = async (
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) => {

    name, sport, yearFounded, city, state, stadium, championshipsWon, players = validation.checkTeam(name, sport, yearFounded, city, state, stadium, championshipsWon, players);

    let team = {
        name: name,
        sport: sport,
        yearFounded: yearFounded,
        city: city,
        state: state,
        stadium: stadium,
        championshipsWon: championshipsWon,
        players: players,
        games: [],
        winLossCount: "0-0"
    }

    const teamCollection = await teams();
    const newInsertInformation = await teamCollection.insertOne({
        name, sport, yearFounded, city, state, stadium, championshipsWon, players,
        winLossCount: "0-0",
        games: []
    });
    if (!newInsertInformation.insertedId) throw 'Error: Insert failed';
    return await getTeamById(newInsertInformation.insertedId.toString());
};

const getAllTeams = async () => {
    const teamCollection = await teams();
    let teamList = await teamCollection.find({}, { projection: { _id: 1, name: 1 } }).toArray();
    if (!teamList) throw 'Could not get all teams';
    teamList = teamList.map((element) => {
        element._id = element._id.toString();
        return element;
    });
    return teamList;
};

const getTeamById = async (id) => {
        if (!id) throw 'You must provide an id to search for';
        if (typeof id !== 'string') throw 'Id must be a string';
        id = id.trim();
        if (id.length === 0) throw 'Id cannot be an empty string or just spaces';
        if (!ObjectId.isValid(id)) throw 'Invalid object ID';

        const teamCollection = await teams();
        const team = await teamCollection.findOne({ _id: new ObjectId(id) });

        if (!team) throw 'No team with that id';

        team._id = team._id.toString();
        return team;
    /*
    let x = new ObjectId();
    if(!id) throw 'You must provide an id to search for';
    if(typeof id !== 'string') throw 'Id must be a string';
    if(id.trim().length === 0){
        throw 'Id cannot be an empty string or just spaces';
    }
    id = id.trim();
    if(!ObjectId.isValid(id)) throw 'invalid object ID';
    const teamCollection = await teams();
    const team = await teamCollection.findOne({_id: new ObjectId(id)});
    if(team === null) throw 'No team with that id';
    team._id = team._id.toString();
    return team;
    */
};

const removeTeam = async (id) => {
    if(!id) throw 'You must provide an id';
    if(typeof id != 'string') throw 'Id must be a string'
    if(id.trim().length === 0 || id.trim() === ''){
        throw 'id cannot be an empty string'
    }
    id = id.trim();
    if(!ObjectId.isValid(id)) throw 'invalid object ID';
    const teamCollection = await teams();
    const deletionInfo = await teamCollection.deleteOne({
        _id: new ObjectId(id)
    });

    if(!deletionInfo){
        throw `Could not delete team with id of ${id}`
    }

    return `${deletionInfo._id} have been successfully deleted!`;
};


const updateTeam = async (
  id,
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) => {

    id, name, sport, yearFounded, city, state, stadium, championshipsWon, players = validation.checkUpdateTeam(id, name, sport, yearFounded, city, state, stadium, championshipsWon, players);

    let updatedTeam = {
        name: name,
        sport: sport,
        yearFounded: yearFounded,
        city: city,
        state: state,
        stadium: stadium,
        championshipsWon: championshipsWon,
        players: players
    }

    const teamCollection = await teams();
    const updateInfo = await teamCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedTeam }
    );

    if (updateInfo.modifiedCount === 0) {
        throw 'Could not update team';
    }

    return await this.getTeamById(id.insertedId.toString());
};

export { createTeam, getAllTeams, getTeamById, removeTeam, updateTeam };
