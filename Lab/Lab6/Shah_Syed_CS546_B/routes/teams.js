// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { Router } from 'express';
import { teamData } from '../data/index.js';

const router = Router();

router.route('/')
    .get(async (req, res) => {
      try {
        const teams = await teamData.getAllTeams();
        res.json(teams);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    })
    .post(async (req, res) => {
      try {
        const { name, sport, yearFounded, city, state, stadium, championshipsWon, players } = req.body;
        const newTeam = await teamData.createTeam(name, sport, yearFounded, city, state, stadium, championshipsWon, players);
        res.json(newTeam);
      } catch (e) {
        res.status(400).json({ error: e });
      }
    });

router.route('/:teamId')
    .get(async (req, res) => {
      try {
        const team = await teamData.getTeamById(req.params.teamId);
        res.json(team);
      } catch (e) {
        res.status(404).json({ error: e });
      }
    })
    .delete(async (req, res) => {
      try {
        const deletedTeam = await teamData.removeTeam(req.params.teamId);
        res.json(deletedTeam);
      } catch (e) {
        res.status(404).json({ error: e });
      }
    })
    .put(async (req, res) => {
      try {
        const { name, sport, yearFounded, city, state, stadium, championshipsWon, players } = req.body;
        const updatedTeam = await teamData.updateTeam(req.params.teamId, name, sport, yearFounded, city, state, stadium, championshipsWon, players);
        res.json(updatedTeam);
      } catch (e) {
        res.status(400).json({ error: e });
      }
    });

export default router;