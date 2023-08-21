import { MongoClient } from "mongodb";

export default async function handler(request, response) {
    if (request.method === "GET") {
        const uri =
        "mongodb+srv://<username>:<password>@cluster0.1lbogw5.mongodb.net/<table>>?retryWrites=true&w=majority";
        const client = await MongoClient.connect(uri);
        const db = client.db();
        const gamedataCollection = db.collection("gamedata");

        // Get
        const gamedata_list = await gamedataCollection.find().toArray();

        // Wrap up
        client.close();

        const data = gamedata_list[0];
        const gamedata = {
            title: data.title,
            history: data.arr,
            id: data._id.toString(),
        };

        response.status(201).json({ message: "gamedata loaded.", gamedata: gamedata });
    }
}
