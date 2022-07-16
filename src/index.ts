import bodyParser from "body-parser";
import cors from "cors";
import crypto from "crypto";
import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import NodeCache from "node-cache";
import path from "path";
import { encrypt } from "./utils/encrypt";
import { storeFile } from "./utils/ipfs";

const app = express();

const cache = new NodeCache({ stdTTL: 30, checkperiod: 45 });

app.use(cors());

const jsonParser = bodyParser.json();

app.use(jsonParser);

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use("/api/health", (_, res) => {
    res.send("Ok");
});

app.post("/api/encrypt", (req, res) => {
    const data = req.body as {data:string, key:string};

    const id = crypto.randomUUID();

    const encryptedData = encrypt(id, data.key);
    console.log("encryptedData", encryptedData, id);
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

app.post("/api/upload", async (req, res) => {
    console.log("f", req.files?.files, req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log("WHEWRE ARE THE FILES");
            return res.status(400).send("No files were uploaded.");
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const file = req.files.files as fileUpload.UploadedFile;

        const cid = await storeFile(file.tempFilePath);

        return res.send(cid);

        // Use the mv() method to place the file somewhere on your server
        // sampleFile.mv("/somewhere/on/your/server/filename.jpg", function(err) {
        //   if (err)
        //     return res.status(500).send(err);
        //   res.send("File uploaded!");
        // });
    });

app.use("/", express.static("./client/dist"));

app.get("*", (_, res) => res.sendFile(path.resolve("client", "dist", "index.html")));

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
