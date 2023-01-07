import joi from 'joi';
import connection from '../db.js';

const cakeSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().greater(0).required(),
    image: joi.string().uri().required(),
    description: joi.string().required().allow('')
});

export async function validateCake(req, res, next){
    const cake = req.body;
    const validation = cakeSchema.validate(cake);
    if (validation.error){
        if(validation.error.details[0].path == 'image'){
            return res.status(422).send(validation.error.details[0].message);
        }
        return res.status(400).send(validation.error.details[0].message);
    }
    try {
        const result = await connection.query(
            `SELECT * FROM cakes WHERE name='${cake.name}';`
        );
        if(result.rowCount>0){
            return res.sendStatus(409);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
    next();
};