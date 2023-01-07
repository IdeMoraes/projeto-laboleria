import joi from 'joi';
import connection from '../db.js';

const orderSchema = joi.object({
    clientId: joi.number().required().integer(),
    cakeId: joi.number().required().integer(),
    quantity: joi.number().required().greater(0).less(5).integer(),
    totalPrice: joi.number().required(),
});

export async function validateOrder(req, res, next){
    const order = req.body;
    const validation = orderSchema.validate(order);
    if (validation.error){
        return res.status(400).send(validation.error.details[0].message);
    }
    try {
        const client = await connection.query(
            `SELECT * FROM clients WHERE id='${order.clientId}';`
        );
        if(client.rowCount===0){
            return res.sendStatus(404);
        };
        const cake = await connection.query(
            `SELECT * FROM cakes WHERE id='${order.cakeId}';`
        );
        if(cake.rowCount===0){
            return res.sendStatus(404);
        };
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
    next();
};