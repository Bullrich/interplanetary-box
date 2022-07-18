import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors";
import crypto from "crypto";
import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { encrypt } from "./utils/encrypt";
import { storeFile } from "./utils/ipfs";

const app = express();
const prisma = new PrismaClient();

app.use(cors());

const jsonParser = bodyParser.json();

app.use(jsonParser);

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use("/api/health", (_, res) => {
    res.send("Ok");
});

app.post("/api/encrypt", (req, res) => {
    const data = req.body as { key: string };

    const id = crypto.randomUUID();

    const encryptedData = encrypt(id, data.key);
    return res.send(encryptedData);
});

app.post("/api/upload", async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.files as fileUpload.UploadedFile;

    const cid = await storeFile(file.tempFilePath);

    return res.send(cid);
});

app.post("/api/contract", async (req, res) => {
    const data = req.body as { address: string, contract: string };

    await prisma.$connect();
    await prisma.box.create({ data });
    return res.status(201);
});

app.get("/api/contract", async (req, res, next) => {
    const address = req.query.address as string;
    if (!address) {
        return res.status(400);
    }
    console.log(address);
    await prisma.$connect();
    const contract = await prisma.box.findUnique({
        where: {
            address
        }
    });
    console.log(contract);
    if (!contract) {
        res.statusCode = 204;
        return res.send("Not found");
        // return next("Not found - 404")
    }
    return res.send(contract.contract);
});

app.use("/", express.static("./client/dist"));

app.get("*", (_, res) => res.sendFile(path.resolve("client", "dist", "index.html")));

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
