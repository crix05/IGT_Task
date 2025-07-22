import express from "express";
import dotenv from "dotenv";
import "./Config/dbConnection.js";
import cors from "cors";
import bodyParser from "body-parser";
import router from './Routes/routes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT;

app.use("/uploads", express.static("uploads/"));
app.get("/", (_, res) => res.send("Express on Vercel"));

app.use("/auth", router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
