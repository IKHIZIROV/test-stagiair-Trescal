import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB, projectsCollection, seed } from "./database";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", (req, res) => {
    
});

app.listen(app.get("port"), async () => {
    await connectDB();
    await seed();
    console.log("Server started on http://localhost:" + app.get("port"));
});