import Joi from 'joi';
import SongModel from './song.model';

export default class SongsController {
    static async findAll(req, res) {
        try {
            const songs = await SongModel.find();
            res.status(200).send(songs);
            return;
        } catch (error) {
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
            const songRes = await SongModel.create(value);
            res.status(200).json(songRes);
            return;
        } catch (error) {
            res.status(500).send(error);
            return;
        }
    }
}
