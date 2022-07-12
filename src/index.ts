import { encrypt } from "./utils/encrypt";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import NodeCache from "node-cache";
import path from "path";

const app = express();

const cache = new NodeCache({ stdTTL: 30, checkperiod: 45 });

app.use(cors());

const jsonParser = bodyParser.json();

app.use(jsonParser);

app.use("/api/health", (_, res) => {
    res.send("Ok");
});

app.get("/api/encrypt", (req, res) => {
    const key = req.query.key as string;
    const data = req.query.data as string;

    const encryptedData = encrypt(key, data);
    return res.send(encryptedData);
});

app.get("/api/cache", (req, res) => {
    const data = req.query.data as string;
    if (!data) {
        return res.status(406);
    }
    const cachedResponse = cache.get<string>(data);
    if (cachedResponse) {
        return res.send(cachedResponse);
    } else {
        cache.set(data, data);
        return res.send("cached!");
    }
});

app.use("/", express.static("./client/dist"));

app.get("*", (_, res) => res.sendFile(path.resolve("client", "dist", "index.html")));

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
