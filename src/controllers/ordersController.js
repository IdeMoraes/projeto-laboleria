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
    const {date} = req.query;
    const {id} = req.params;
    let filterByOrderId = '';
    let filterByDate = '';
    let filterByClientId = '';
    if (req.url.includes('clients')) {
        filterByClientId = `AND clients.id = ${id}`;
    } else{
        if(id){
            filterByOrderId = `AND orders.id = ${id}`;
        };
        if(date){
            filterByDate = `AND orders."createdAt"::date = '${date}'`;
        };
    };
    try {
        const result = await connection.query(
            `SELECT clients.name as "clientName", clients.address, clients.phone, cakes.name as "cakeName", cakes.price, cakes.description, cakes.image, flavours.id as "flavourId", flavours.name as "flavourName", orders.* FROM orders JOIN clients ON orders."clientId"=clients.id JOIN cakes ON orders."cakeId"=cakes.id JOIN flavours ON flavours.id=cakes."flavourId" ${filterByDate} ${filterByOrderId} ${filterByClientId};`
        );
        if(result.rowCount===0){
            if(date){
                return res.status(404).send([]);
            } else {
                return res.sendStatus(404);
            }
        };
        const answer = result.rows.map((element)=>{
            const {clientId, clientName, address, phone, cakeId, cakeName, price, description, image, id, createdAt, quantity, totalPrice, flavourId, flavourName, isDelivered} = element;
            if(req.url.includes('clients')){
                return {
                    clientId,
                    cakeId,
                    flavourId,
                    quantity,
                    totalPrice,
                    isDelivered
                }
            } else{
                return {
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
                    flavour:{
                        id: flavourId,
                        name: flavourName
                    },
                    orderId: id,
                    createdAt,
                    quantity,
                    totalPrice,
                    isDelivered
                }

            }
        });
        return res.status(200).send(answer);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
};

export async function updateOrder(req, res){
    const {id} = req.params;
    if(!Number.isInteger(Number(id))){
        return res.sendStatus(400);
    };
    try {
        const order = await connection.query(
            `SELECT * FROM orders WHERE id='${id}';`
        );
        if(order.rowCount===0){
            return res.sendStatus(404);
        }
        await connection.query(`UPDATE orders SET "isDelivered"='true' WHERE id = ${id};`);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
};
