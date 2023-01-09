import connection from "../db.js";

export async function insertCake(req, res){
    const { name, price, image, description } = req.body;
    console.log(price);
    try {
        const result = await connection.query(
            "INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4)",
            [name, price, image, description]
        );
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
}