import express from 'express';
import songsRouter from './resources/songs';

const router = express.Router();

router.route('/songs', songsRouter);
