/*

Create a team of your choice.
Log the newly created team. (Just that team, not all teams)
Create another team of your choice.
Query all team, and log them all
Create the 3rd team of your choice.
Log the newly created 3rd team. (Just that team, not all team)
Move the first team
Log the first team with the updated info. 
Remove the second team you created.
Query2 all teams, and log them all
Try to create a team with bad input parameters to make sure it throws errors.
Try to remove a team that does not exist to make sure it throws errors.
Try to rename a team that does not exist to make sure it throws errors.
Try to rename a team passing in invalid data to make sure it throws errors.
Try getting a team by ID that does not exist to make sure it throws errors.

*/

import * as teams from './data/teams.js';
import {dbConnection, closeConnection} from './config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

let team4 = undefined
let team5 = undefined
let team6 = undefined
let team7_id = undefined

async function main(){

    // 1
    let team1 = await teams.createTeam("Yankees", "Baseball", 1903, "New York", "NY", "Yankee Stadium", 27, [
        { firstName: "DJ", lastName: "LeMahieu", position: "2B" },
        { firstName: "Aaron", lastName: "Judge", position: "RF" },
        { firstName: "Giancarlo", lastName: "Stanton", position: "DH" },
        { firstName: "Anthony", lastName: "Rizzo", position: "1B" },
        { firstName: "Gleyber", lastName: "Torres", position: "SS" },
        { firstName: "Harrison", lastName: "Bader", position: "CF" },
        { firstName: "Oswaldo", lastName: "Cabrera", position: "LF" },
        { firstName: "Isiah", lastName: "Kiner-Falefa", position: "3B" },
        { firstName: "Kyle", lastName: "Higashioka", position: "C" }
    ]);
    // 2
    console.log("2. Single Team ")
    console.log(team1);

    // 3
    let team2 = await teams.createTeam("Lakers", "Basketball", 1947, "Los Angeles", "CA", "Staples Center", 17, [
            { firstName: "LeBron", lastName: "James", position: "SF" },
            { firstName: "Anthony", lastName: "Davis", position: "PF" },
            { firstName: "Dwight", lastName: "Howard", position: "C" }
        ]
    );

    // 4
    let allTeams = await teams.getAllTeams();
    console.log('4. All teams:')
    console.log(allTeams)

    // 5
    let team3 = await teams.createTeam("Warriors", "Basketball", 1946, "San Francisco", "CA", "Chase Center", 6, [
            { firstName: "Stephen", lastName: "Curry", position: "PG" },
            { firstName: "Klay", lastName: "Thompson", position: "SG" },
            { firstName: "Draymond", lastName: "Green", position: "PF" },
        ]
    );
    // 6
    console.log("6. 3rd Team:");
    console.log(team3);

    // 7
    team1 = await teams.moveTeam(team1._id, "Hoboken", "NJ", "Sinatra Park")
    // 8
    console.log("8. Moved 1st team");
    console.log(team1);

    // 9
    team2 = await teams.removeTeam(team2._id)

    // 10
    allTeams = await teams.getAllTeams();
    console.log('10. All teams:')
    console.log(allTeams)

    // 11
    try{
        team4 = await teams.createTeam("Barcelona", "Soccer", "1899", "Jersey City", "NL", "NJ stadium", 7, [
            { firstName: "Stephen2", lastName: "Curry2", position: "PG" },
            { firstName: "Klay2", lastName: "Thompson2", position: "SG" },
            { firstName: "Draymond2", lastName: "Green2", position: "PF" },
        ])
    }catch (e) {
        console.log('11. ' + e)
    }

    // 12
    try{
        team5 = await teams.removeTeam('34123sdasda213')
    }catch (e) {
        console.log('12. ' + e)
    }

    // 13
    try{
        team6 = await teams.moveTeam("34123sdasda213azz", "JerseyCity", "NJ", "NJ Stadium")
    }catch (e){
        console.log('13. ' + e)
    }

    // 14
    try{
        team3 = await teams.moveTeam(team3._id, 4, "NJ", "JerseyStadium")
    }catch (e){
        console.log('14. ' + e)
    }

    // 15
    try{
        team7_id = await teams.getTeamById("sdfsd4543")
    }catch (e){
        console.log('15. ' + e)
    }

}

main()

