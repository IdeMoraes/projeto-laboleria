import joi from 'joi';

const clientSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().required().min(10).max(11),
});

export async function validateClient(req, res, next){
    const client = req.body;
    const validation = clientSchema.validate(client);
    if (validation.error){
        return res.status(400).send(validation.error.details[0].message);
    }
    next();
};