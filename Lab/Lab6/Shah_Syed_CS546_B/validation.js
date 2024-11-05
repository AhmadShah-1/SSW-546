
import {ObjectId} from "mongodb";
import { getTeamById } from './data/teams.js';

const exportedMethods= {
    checkString(strVal, varName) {
        if (!strVal) throw `Error: You must supply a ${varName}!`;
        if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
        strVal = strVal.trim();
        if (strVal.length === 0)
            throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        if (!isNaN(strVal))
            throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
        return strVal;
    },

    checkNumber(numVal, varName) {
        numVal = numVal.trim();
        if (!numVal) throw `Error: You must supply a ${varName}!`;
        if (typeof numVal !== 'number') throw `Error: ${varName} must be a number!`;
        if (numVal < 0) throw `Error: ${varName} cannot be negative!`;
        return numVal;
    },

    checkStringArray(arr, varName) {
        if (!arr || !Array.isArray(arr))
            throw `You must provide an array of ${varName}`;
        for (let i in arr) {
            if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
                throw `One or more elements in ${varName} array is not a string or is an empty string`;
            }
            arr[i] = arr[i].trim();
        }
        return arr;
    },

    checkBoolean(boolVal, varName) {
        if (typeof boolVal !== 'boolean') throw `Error: ${varName} must be a boolean!`;
        return boolVal;
    },

    checkId(id, varName) {
        if (!id) throw `Error: You must provide a ${varName}`;
        if (typeof id !== 'string') throw `Error:${varName} must be a string`;
        id = id.trim();
        if (id.length === 0)
            throw `Error: ${varName} cannot be an empty string or just spaces`;
        if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
        return id.trim();
    },


    checkTeam(name, sport, yearFounded, city, state, stadium, championshipsWon, players){
        if (!name || !sport || !yearFounded || !city || !state || !stadium || !championshipsWon || !players) {
            throw 'Some fields were missing';
        }
        if (typeof name !== 'string' || typeof sport !== 'string' || typeof city !== 'string' || typeof state !== 'string' || typeof stadium !== 'string') {
            throw 'Some fields were not strings';
        }
        if (name.trim() === '' || sport.trim() === '' || city.trim() === '' || state.trim() === '' || stadium.trim() === '') {
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

        if (!validStates.includes(state) || state.length !== 2) {
            throw 'Invalid state';
        }

        let date = new Date();
        let currentYear = date.getFullYear();
        if (yearFounded > currentYear || yearFounded < 1850) {
            throw 'Invalid year';
        }
        if (championshipsWon < 0) {
            throw 'Championships cannot be negative';
        }
        if (!Array.isArray(players)) {
            throw 'Players must be an array';
        }
        for (let player of players) {
            if (typeof player !== 'object') {
                throw 'Players must be objects';
            }
            if (!player.firstName || !player.lastName || !player.position) {
                throw 'Name or position is missing';
            }
            if (typeof player.firstName !== 'string' || typeof player.lastName !== 'string' || typeof player.position !== 'string') {
                throw 'Some fields were not strings';
            }
            if (player.firstName.trim() === '' || player.lastName.trim() === '' || player.position.trim() === '') {
                throw 'Some fields were empty';
            }
            if (Object.keys(player).length === 0) {
                throw 'Player values is empty';
            }

            let not_empty = false;
            for (let key in player) {
                if (player[key].trim().length > 0) {
                    not_empty = true;
                    break;
                }
            }
            if (not_empty === false) {
                throw 'Player values is empty';
            }
            for (let key in player) {
                if (typeof player[key] !== 'string') {
                    throw 'key is not a string';
                }
            }
        }
        return name, sport, yearFounded, city, state, stadium, championshipsWon, players;
    },


    checkUpdateTeam(id, name, sport, yearFounded, city, state, stadium, championshipsWon, players){
        if (!id || !name || !sport || !yearFounded || !city || !state || !stadium || !championshipsWon || !players) {
            throw 'Some fields were missing';
        }
        if (typeof name !== 'string' || typeof sport !== 'string' || typeof city !== 'string' || typeof state !== 'string' || typeof stadium !== 'string') {
            throw 'Some fields were not strings';
        }
        if (name.trim() === '' || sport.trim() === '' || city.trim() === '' || state.trim() === '' || stadium.trim() === '') {
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

        if (!validStates.includes(state) || state.length !== 2) {
            throw 'Invalid state';
        }

        let date = new Date();
        let currentYear = date.getFullYear();
        if (yearFounded > currentYear || yearFounded < 1850) {
            throw 'Invalid year';
        }
        if (championshipsWon < 0) {
            throw 'Championships cannot be negative';
        }
        if (!Array.isArray(players)) {
            throw 'Players must be an array';
        }
        for (let player of players) {
            if (typeof player !== 'object') {
                throw 'Players must be objects';
            }
            if (!player.firstName || !player.lastName || !player.position) {
                throw 'Name or position is missing';
            }
            if (typeof player.firstName !== 'string' || typeof player.lastName !== 'string' || typeof player.position !== 'string') {
                throw 'Some fields were not strings';
            }
            if (player.firstName.trim() === '' || player.lastName.trim() === '' || player.position.trim() === '') {
                throw 'Some fields were empty';
            }
            if (Object.keys(player).length === 0) {
                throw 'Player values is empty';
            }

            let not_empty = false;
            for (let key in player) {
                if (player[key].trim().length > 0) {
                    not_empty = true;
                    break;
                }
            }
            if (not_empty === false) {
                throw 'Player values is empty';
            }
            for (let key in player) {
                if (typeof player[key] !== 'string') {
                    throw 'key is not a string';
                }
            }
            id = this.checkId(id, "iD")
            return id, name, sport, yearFounded, city, state, stadium, championshipsWon, players;
        }
    },

    checkCreateGame(teamId, gameDate, opposingTeamId, homeOrAway, finalScore, win){
        if (!teamId || !gameDate || !opposingTeamId || !homeOrAway || !finalScore || win === undefined) {
            throw 'All fields need to have valid values';
        }

        [teamId, gameDate, opposingTeamId, homeOrAway, finalScore].forEach((field, index) => {
            if (typeof field !== 'string' || field.trim().length === 0) {
                throw `${String(field)} must be a string`;
            }
        });

        if (!ObjectId.isValid(teamId)) throw 'Invalid teamId';
        if (!ObjectId.isValid(opposingTeamId)) throw 'Invalid opposingTeamId';

        const team = getTeamById(teamId);
        if (!team) throw 'The team does not exist';

        const opposingTeam = getTeamById(opposingTeamId);
        if (!opposingTeam) throw 'The opposing team does not exist';

        // Check if gameDate is correct
        this.checkDate(gameDate);

        if (homeOrAway !== 'Home' && homeOrAway !== 'Away') {
            throw 'homeOrAway must be "Home" or "Away"';
        }

        const [score1, score2] = finalScore.split('-').map(Number);
        if (finalScore.split('-').length !== 2 || isNaN(score1) || isNaN(score2) || score1 < 0 || score2 < 0 || score1 === score2) {
            throw 'finalScore is incorrect';
        }

        if (typeof win !== 'boolean') throw 'win must be a boolean';

        if (team.sport !== opposingTeam.sport) {
            throw 'Both teams must belong to the same sport';
        }
    },

    // https://www.scaler.com/topics/date-validation-in-javascript/
    checkDate(gameDate){
        let dateformat = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;

        if (gameDate.match(dateformat)) {
            let operator = gameDate.split('/');

            let datepart = [];
            if (operator.length > 1) {
                datepart = gameDate.split('/');
            }
            let month = parseInt(datepart[0]);
            let day = parseInt(datepart[1]);
            let year = parseInt(datepart[2]);

            let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (month == 1 || month > 2) {
                if (day > ListofDays[month - 1]) {
                    throw 'Invalid gameDate';
                }
            } else if (month == 2) {
                let leapYear = false;
                if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
                if ((leapYear == false) && (day >= 29)) throw 'Invalid gameDate';
                else if ((leapYear == true) && (day > 29)) {
                    throw 'Invalid gameDate';
                }
            }
        } else {
            throw 'gameDate must be in mm/dd/yyyy format';
        }
    },

    checkGetAllGames(teamId){
        if (!teamId) {
            throw 'teamId must be provided';
        }
        if (typeof teamId !== 'string' || teamId.trim().length === 0) {
            throw 'teamId must be a string';
        }
        if (!ObjectId.isValid(teamId)) throw 'Invalid teamId';

        const team = getTeamById(teamId);
        if (!team) throw 'The team does not exist';
        return teamId.trim()
    },

    checkGetGame(gameId){
        if (!gameId) {
            throw 'gameId must be provided';
        }
        if (typeof gameId !== 'string' || gameId.trim().length === 0) {
            throw 'gameId must be a string';
        }

        gameId = gameId.trim();
        if (!ObjectId.isValid(gameId)) throw 'Invalid gameId';

        return gameId
    },


    checkUpdateGame(gameId, updateObject){
        if (!gameId) {
            throw 'gameId must be provided';
        }
        if (typeof gameId !== 'string' || gameId.trim().length === 0) {
            throw 'gameId must be a string';
        }

        gameId = gameId.trim();

        if (!ObjectId.isValid(gameId)) throw 'Invalid gameId';

        if (!updateObject) {
            throw 'updateObject must be provided';
        }
        if (typeof updateObject !== 'object' || Object.keys(updateObject).length === 0) {
            throw 'updateObject must be an object with at least one field';
        }

        const allowedFields = ['gameDate', 'opposingTeamId', 'homeOrAway', 'finalScore', 'win'];
        for (const key in updateObject) {
            if (!allowedFields.includes(key)) {
                throw `Invalid field: ${key}`;
            }
            if (typeof updateObject[key] !== 'string' || updateObject[key].trim().length === 0) {
                throw `${key} must be a non-empty string`;
            }
        }

        return gameId, updateObject
    }



    }
export default exportedMethods;




























