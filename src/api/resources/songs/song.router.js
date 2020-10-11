import express from 'express';
import SongsController from './song.controller';

export const songsRouter = express.Router();

songsRouter
    .route('/')
    .get(SongsController.findAll)
    .post(SongsController.create);
