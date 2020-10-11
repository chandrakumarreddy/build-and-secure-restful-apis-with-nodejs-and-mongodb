import express from 'express';
import songsController from './song.controller';

export const songsRouter = express.Router();

songsRouter
    .route('/')
    .get(songsController.findAll)
    .post(songsController.create);
songsRouter.route('/:songId').get(songsController.findOne);
