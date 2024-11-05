import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import { teamData, gameData } from '../data/index.js';

const db = await dbConnection();
await db.dropDatabase();

try {
    const team1 = await teamData.createTeam(
        'Yankees',
        'Baseball',
        1903,
        'New York',
        'NY',
        'Yankee Stadium',
        27,
        [
            { firstName: 'DJ', lastName: 'LeMahieu', position: '2B' },
            { firstName: 'Aaron', lastName: 'Judge', position: 'RF' },
            { firstName: 'Giancarlo', lastName: 'Stanton', position: 'DH' }
        ]
    );
    console.log(`Created team: ${team1.name}`);

    const team2 = await teamData.createTeam(
        'Mets',
        'Baseball',
        1962,
        'New York',
        'NY',
        'Citi Field',
        2,
        [
            { firstName: 'Pete', lastName: 'Alonso', position: '1B' },
            { firstName: 'Francisco', lastName: 'Lindor', position: 'SS' },
            { firstName: 'Brandon', lastName: 'Nimmo', position: 'CF' }
        ]
    );
    console.log(`Created team: ${team2.name}`);

    const game1 = await gameData.createGame(
        team1._id.toString(),
        '05/12/2024',
        team2._id.toString(),
        'Home',
        '5-2',
        true
    );
    console.log(`Created game: ${game1.games[0]._id}`);

    const game2 = await gameData.createGame(
        team1._id.toString(),
        '06/20/2024',
        team2._id.toString(),
        'Away',
        '3-7',
        false
    );
    console.log(`Created game: ${game2.games[1]._id}`);

} catch (e) {
    console.error(e);
} finally {
    console.log('Done seeding database');
    await closeConnection();
}
