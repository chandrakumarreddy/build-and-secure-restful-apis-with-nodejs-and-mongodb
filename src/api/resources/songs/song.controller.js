import Joi from 'joi';

export default class SongsController {
    static getSongs(req, res) {
        res.send('TO DO LIST ALL SONGS');
    }
    static async postSongs(req, res) {
        const schema = Joi.object()
            .options({ abortEarly: false })
            .keys({
                title: Joi.string().required().messages({
                    'any.required': 'title is a required',
                }),
                url: Joi.string()
                    .required()
                    .messages({ 'any.required': 'url is required' }),
                rating: Joi.number().min(0).max(5).optional().messages({
                    'number.max': 'rating must be less than or equal to 5',
                }),
            });

        try {
            const value = await schema.validateAsync(req.body);
            res.json(value);
        } catch (error) {
            const messages = error.details.reduce((emptyObj, err) => {
                emptyObj[err.context.label] = err.message;
                return emptyObj;
            }, {});
            res.json(messages);
        }
    }
}
