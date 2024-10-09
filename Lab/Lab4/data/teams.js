// TODO: Export and implement the following functions in ES6 format
import {teams} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';


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

    if(!name || !sport || !yearFounded || !city || !state || !stadium || !championshipsWon || !players){
        throw 'Some fields were missing';
    }
    if(typeof name !== 'string' || typeof sport !== 'string' || typeof city !== 'string' || typeof state !== 'string' || typeof stadium !== 'string'){
        throw 'Some fields were not strings';
    }
    if(name.trim() === '' || sport.trim() === '' || city.trim() === '' || state.trim() === '' || stadium.trim() === ''){
        throw 'Input contains empty string';
    }
    name = name.trim();
    sport = sport.trim();
    city = city.trim();
    state = state.trim();
    stadium = stadium.trim();

    const validStates = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    if (!validStates.includes(state) || state.length !== 2){
        throw 'Invalid state';
    }

    let date = new Date();
    let currentYear = date.getFullYear();
    if(yearFounded > currentYear || yearFounded < 1850){
        throw 'Invalid year';
    }
    if(championshipsWon < 0){
        throw 'Championships cannot be negative';
    }
    if(!Array.isArray(players)){
        throw 'Players must be an array';
    }
    for(let player of players){
        if(typeof player !== 'object'){
            throw 'Players must be objects';
        }
        if(!player.firstName || !player.lastName || !player.position){
            throw 'Name or position is missing';
        }
        if(typeof player.firstName !== 'string' || typeof player.lastName !== 'string' || typeof player.position !== 'string'){
            throw 'Some fields were not strings';
        }
        if(player.firstName.trim() === '' || player.lastName.trim() === '' || player.position.trim() === ''){
            throw 'Some fields were empty';
        }
        if(Object.keys(player).length === 0){
            throw 'Player values is empty';
        }

        let not_empty = false;
        for(let key in player){
            if(player[key].trim().length > 0){
                not_empty = true;
                break;
            }
        }
        if(not_empty === false){
            throw 'Player values is empty';
        }
        for(let key in player){
            if(typeof player[key] !== 'string'){
                throw 'key is not a string'
            }
        }
    }

    let team = {
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
    const insertInfo = await teamCollection.insertOne(team);

    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw 'Could not add team';
    }

    const newId = insertInfo.insertedId.toString();
    const newTeam = await getTeamById(newId);
    return newTeam;
};

const getAllTeams = async () => {
    const teamCollection = await teams();
    let teamList = await teamCollection.find({}).toArray();
    if (!teamList) throw 'Could not get all teams';
    teamList = teamList.map((element) => {
        element._id = element._id.toString();
        return element;
    });
    return teamList;
};

const getTeamById = async (id) => {
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
};

const removeTeam = async (id) => {
    if(!id) throw 'You must provide an id to search for';
    if(typeof id != 'string') throw 'Id must be a string'
    if(id.trim().length === 0 || id.trim() === ''){
        throw 'id cannot be an empty string or just spaces'
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

const moveTeam = async (id, newCity, newState, newStadium) => {
    if(!id) throw "You must provide an id"
    if(typeof id != 'string') throw 'id must be string'
    if(id.trim() === '') throw 'empty id'
    id = id.trim()
    if(!ObjectId.isValid(id)) throw 'invalud object id'
    if(!newCity || !newStadium || !newState) throw 'City, stadium, or state not provided'
    if(typeof newCity != 'string' || typeof newStadium != 'string' || typeof newState != 'string') throw 'City, stadium, or state is not string'
    if(newCity.trim() === '' || newState.trim() === '' || newStadium === '') throw 'City, stadium, or state is empty'

    newCity = newCity.trim()
    newState = newState.trim()
    newStadium = newStadium.trim()

    const validStates = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];
    if (!validStates.includes(newState) || newState.length !== 2){
        throw 'Invalid state';
    }

    const updatedTeam = {
        city: newCity,
        state: newState,
        stadium: newStadium
    }

    const teamCollection = await teams();
    const updatedInfo = await teamCollection.findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set: updatedTeam},
        {returnDocument: 'after '}
        )
    if(!updatedInfo){
        throw 'could not update team successfully'
    }
    updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;
};


export {createTeam, getAllTeams, getTeamById, removeTeam, moveTeam};