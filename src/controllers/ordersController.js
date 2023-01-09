import connection from "../db.js";

export async function insertOrder(req, res){
    const { clientId, cakeId, quantity, totalPrice } = req.body;
    try {
        const result = await connection.query(
            `INSERT INTO orders ("clientId", "cakeId", "quantity", "totalPrice") VALUES ($1, $2, $3, $4)`,
            [clientId, cakeId, quantity, totalPrice]
        );
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
};

export async function selectOrders(req, res){
    /* const date = parseInt(req.query.date); */
    let date;
/*     date = '2023-01-07'; */
    let filterByDate = '';
    if(date){
        filterByDate = `AND orders."createdAt"::date = '${date}'`;
    } 
    try {
        const result = await connection.query(
            `SELECT clients.name as "clientName", clients.address, clients.phone, cakes.name as "cakeName", cakes.price, cakes.description, cakes.image, orders.* FROM orders JOIN clients ON orders."clientId"=clients.id JOIN cakes ON orders."cakeId"=cakes.id ${filterByDate};`
        );
        if(result.rowCount===0){
            return res.status(404).send([]);
        };
        const {clientId, clientName, address, phone, cakeId, cakeName, price, description, image, id, createdAt, quantity, totalPrice} = result.rows[0];
        return res.status(200).send([{
            client:{
                id: clientId,
                name: clientName,
                address,
                phone
            },
            cake:{
                id: cakeId,
                name: cakeName,
                price,
                description,
                image
            },
            orderId: id,
            createdAt,
            quantity,
            totalPrice
        }]);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
}