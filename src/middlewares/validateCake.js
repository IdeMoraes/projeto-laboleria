import joi from 'joi';
import connection from '../db.js';

const cakeSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().greater(0).required(),
    image: joi.string().uri().required(),
    description: joi.string().required().allow(''),
    flavourId: joi.number().required().integer()
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
        const flavourResult = await connection.query(
            `SELECT * FROM flavours WHERE id='${cake.flavourId}';`
        );
        if(flavourResult.rowCount===0){
            return res.sendStatus(404);
        };
        const cakeResult = await connection.query(
            `SELECT * FROM cakes WHERE name='${cake.name}';`
        );
        if(cakeResult.rowCount>0){
            return res.sendStatus(409);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
    next();
};