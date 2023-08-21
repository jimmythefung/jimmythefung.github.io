import { MongoClient } from "mongodb";

export default async function handler(request, response) {
    const uri =
        "mongodb+srv://<username>:<password>@cluster0.1lbogw5.mongodb.net/<table>>?retryWrites=true&w=majority";
    if (request.method === "POST") {
        const data = request.body;

        const client = await MongoClient.connect(uri);
        const db = client.db();
        const gamedataCollection = db.collection("gamedata");

        // Insert and output
        const result = await gamedataCollection.insertOne(data);
        console.log(result);

        // Wrap up
        client.close();
        response.status(201).json({ message: "gamedata inserted." });
    }
}
