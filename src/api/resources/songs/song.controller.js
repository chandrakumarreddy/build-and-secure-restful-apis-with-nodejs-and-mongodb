import Joi from 'joi';
import songModel from './song.model';
import SongModel from './song.model';

export default class SongsController {
    static async findAll(req, res) {
        try {
            const { offset = 0, limit = 10 } = req.query ?? {};
            const songs = await SongModel.paginate(
                {},
                {
                    offset,
                    limit,
                    customLabels: {
                        docs: 'results',
                    },
                }
            );
            res.status(200).send(songs);
            return;
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
            return;
        }
    }
    static async create(req, res) {
        try {
            const schema = Joi.object()
                .options({ abortEarly: false })
                .keys({
                    title: Joi.string().required().messages({
                        'any.required': 'title is a required',
                    }),
                    url: Joi.string()
                        .required()
                        .messages({ 'any.required': 'url is required' }),
                    rating: Joi.number()
                        .integer()
                        .min(0)
                        .max(5)
                        .optional()
                        .messages({
                            'number.max':
                                'rating must be less than or equal to 5',
                        }),
                });

            const { value, error } = schema.validate(req.body);
            if (error?.details) {
                const messages = error.details.reduce((emptyObj, err) => {
                    emptyObj[err.context.label] = err.message;
                    return emptyObj;
                }, {});
                res.status(400).json(messages);
                return;
            }
            const newSong = await SongModel.create(value);
            res.status(200).send(newSong);
            return;
        } catch (error) {
            res.status(500).send(error);
            return;
        }
    }
    static async findOne(req, res) {
        try {
            const { songId } = req.params;
            const song = await SongModel.findById(songId);
            if (!song) {
                res.status(404).send('no song found');
                return;
            }
            res.status(200).send(song);
            return;
        } catch (error) {
            res.status(500).send(error);
            return;
        }
    }
    static async delete(req, res) {
        try {
            const { songId } = req.params;
            const song = await songModel.findByIdAndRemove(songId);
            if (!song) {
                res.status(404).json({ error: 'No song found' });
                return;
            }
            res.status(200).send(song);
        } catch (error) {
            res.status(500).send(error);
            return;
        }
    }
    static async update(req, res) {
        try {
            const schema = Joi.object().keys({
                title: Joi.string().optional(),
                url: Joi.string().optional(),
                rating: Joi.number().integer().min(0).max(5).optional(),
            });
            const { value, error } = await schema.validate(req.body);
            if (error && error.details) {
                const messages = error.details.reduce((emptyObj, err) => {
                    emptyObj[err.context.label] = err.message;
                    return emptyObj;
                }, {});
                res.status(400).json(messages);
                return;
            }
            const song = await songModel.findByIdAndUpdate(
                req.params.songId,
                value,
                { new: true }
            );
            if (!song) {
                res.status(404).json({ error: 'No song found' });
                return;
            }
            res.status(200).send(song);
        } catch (error) {
            res.status(500).send(error);
            return;
        }
    }
}
