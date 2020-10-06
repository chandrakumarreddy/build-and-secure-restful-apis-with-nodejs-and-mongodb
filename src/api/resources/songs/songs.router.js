import express from 'express';
import SongsController from './songs.controller';

export const songsRouter = express.Router();

songsRouter
    .route('/')
    .get(SongsController.getSongs)
    .post(SongsController.postSongs);
