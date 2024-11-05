// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { Router } from 'express';
import { gameData } from '../data/index.js';
import { ObjectId } from 'mongodb';

const router = Router();

router.route('/:teamId')
    .get(async (req, res) => {
      try {
        const games = await gameData.getAllGames(req.params.teamId);
        res.json(games);
      } catch (e) {
        res.status(404).json({ error: e });
      }
    })
    .post(async (req, res) => {
      try {
        const { gameDate, opposingTeamId, homeOrAway, finalScore, win } = req.body;
        const newGame = await gameData.createGame(req.params.teamId, gameDate, opposingTeamId, homeOrAway, finalScore, win);
        res.json(newGame);
      } catch (e) {
        res.status(400).json({ error: e });
      }
    });

router.route('/game/:gameId')
    .get(async (req, res) => {
      try {
        if (!ObjectId.isValid(req.params.gameId)) {
          return res.status(400).json({ error: 'Invalid gameId' });
        }
        const game = await gameData.getGame(req.params.gameId);
        res.json(game);
      } catch (e) {
        res.status(404).json({ error: e });
      }
    })
    .patch(async (req, res) => {
      try {
        if (!ObjectId.isValid(req.params.gameId)) {
          return res.status(400).json({ error: 'Invalid gameId' });
        }
        const updatedGame = await gameData.updateGame(req.params.gameId, req.body);
        res.json(updatedGame);
      } catch (e) {
        res.status(400).json({ error: e });
      }
    })
    .delete(async (req, res) => {
      try {
        if (!ObjectId.isValid(req.params.gameId)) {
          return res.status(400).json({ error: 'Invalid gameId' });
        }
        const deletedGame = await gameData.removeGame(req.params.gameId);
        res.json(deletedGame);
      } catch (e) {
        res.status(404).json({ error: e });
      }
    });

export default router;