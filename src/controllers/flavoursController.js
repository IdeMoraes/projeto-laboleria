import connection from "../db.js";

export async function insertFlavour(req, res){
    const { name } = req.body;
    try {
        const result = await connection.query(
            "INSERT INTO flavours (name) VALUES ($1)",
            [name]
        );
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
}