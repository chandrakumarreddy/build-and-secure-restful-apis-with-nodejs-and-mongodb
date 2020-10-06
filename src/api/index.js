import express from 'express';
import { songsRouter } from './resources/songs';

const apiRouter = express.Router();

apiRouter.use('/songs', songsRouter);

export default apiRouter;
