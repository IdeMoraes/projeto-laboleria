import joi from 'joi';
import connection from '../db.js';

const flavourSchema = joi.object({
    name: joi.string().min(2).required(),
});

export async function validateFlavour(req, res, next){
    const flavour = req.body;
    const validation = flavourSchema.validate(flavour);
    if (validation.error){
        return res.status(400).send(validation.error.details[0].message);
    }
    try {
        const result = await connection.query(
            `SELECT * FROM flavours WHERE name='${flavour.name}';`
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